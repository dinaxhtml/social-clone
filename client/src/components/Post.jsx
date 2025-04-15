import React, { useContext, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import moment from "moment";
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import { AuthContext } from '../context/authContext';

const Post = ({post}) => {

  const [commentOpen, setCommentOpen]= useState(false);
  const [menuOpen, setMenuOpen]= useState(false);
  const {currentUser}= useContext(AuthContext);
  const queryClient = useQueryClient();
  
  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id, {
          withCredentials: true,
        }).then((res) => res.data),
    refetchOnWindowFocus: false,
});

const mutation = useMutation({
    mutationFn: (liked) => {
      if(liked) return makeRequest.delete("/likes?postId="+ post.id)
      return makeRequest.post("/likes", {postId: post.id})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] }); // Corrected for v5
    },
});

const handleLike= ()=> {
  mutation.mutate(data.includes(currentUser.id)); 
}

// Now we safely know data is at least an empty array, never undefined
const isLiked = Array.isArray(data) && data.includes(currentUser.id);
const likeCount = Array.isArray(data) ? data.length : 0;

const deleteMutation = useMutation({
  mutationFn: (postId) => {
    return makeRequest.delete("/posts/"+ postId)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] }); // Corrected for v5
  },
});
const handleDelete = ()=> {
  deleteMutation.mutate(post.id);
}
  return (
    <div className="post">
        <div className="container">
            <div className="user">
              <div className="userInfo">
                <img src={"/upload/"+post.profilePic} alt="" />
                <div className="details">
                  <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color:"inherit"}}>
                    <span className='name'>{post.name}</span>
                  </Link>
                  <span className="date">{moment(post.createdAt).fromNow()}</span>
                </div>
              </div>
              <MoreHorizIcon onClick={()=> setMenuOpen(!menuOpen)}/>
                {menuOpen && post.userId == currentUser.id && (<button onClick={handleDelete}>Delete</button>)}
            </div>
            <div className="content">
              <p>{post.desc}</p>
              <img src={"./upload/"+post.img} alt="" />
            </div>
            <div className="info">
              <div className="item">
              {isLoading? "Loading.." : isLiked ? (
                  <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/>
                ) : (
                  <FavoriteBorderOutlinedIcon onClick={handleLike}/>
                )}
                {likeCount} Likes
              </div>
              <div className="item" onClick={()=>{setCommentOpen(!commentOpen)}}>
                <TextsmsOutlinedIcon/>
                12 Comments
              </div>
              <div className="item">
                <ShareOutlinedIcon/>
                Share
              </div>
            </div>
            {commentOpen && <Comments postId={post.id}/>}
        </div>
    </div>
  )
}

export default Post;