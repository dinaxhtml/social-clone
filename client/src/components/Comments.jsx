import React, { useContext, useState } from 'react'
import {AuthContext} from "../context/authContext";
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import moment from "moment";

const Comments = ({postId}) => {
    const {currentUser}= useContext(AuthContext);
    const queryClient = useQueryClient();
    const [desc, setDesc] = useState("");

    const { isLoading, error, data } = useQuery({
        queryKey: ["comments"],
        queryFn: () =>
          makeRequest.get("/comments?postId="+postId, {
            withCredentials: true, // Ensures cookies (like accessToken) are sent
          }).then((res) => res.data),
          refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        mutationFn: (newComment) => makeRequest.post("/comments", newComment),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['comments'] }); // Corrected for v5
        },
    });
    
    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({desc, postId});
        setDesc("");
    }
<img src=''/>
  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic!==null && `/upload/${currentUser.profilePic}`} alt="" />
            <input type="text" onChange={(e)=>setDesc(e.target.value)} value={desc} placeholder='Write a comment'/>
            <button onClick={handleClick}>Send</button>
        </div>
        {isLoading? "Loading.." : data.map(comment => {
        return <div className="comment">
            <img src={`/upload/${comment.profilePic}`} alt="" />
            <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
            </div>
            <div className="date">{moment(comment.createdAt).fromNow()}</div>
            </div>
        })}
    </div>
  )
}

export default Comments