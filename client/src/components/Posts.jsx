import Post from './Post';
import {useQuery} from '@tanstack/react-query'
import {makeRequest} from "../axios.js";

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId="+userId, {
        withCredentials: true, // Ensures cookies (like accessToken) are sent
      }).then((res) => res.data),
      refetchOnWindowFocus: false,
  });
  
  console.log(data);
  
  return (
    <div className="posts">
      {error? "Something went wrong": isLoading? "loading": data.map((post)=>{
        //<div className="post">
        return <Post post={post} key={post.id} />
        //</div>
      })}
    </div>
  )
}

export default Posts;