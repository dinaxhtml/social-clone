import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import {makeRequest} from "../axios.js";
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

const Share = () => {
  
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async ()=> {
    try {
      const formData= new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

// console.log(currentUser);

  const mutation = useMutation({
    mutationFn: (newPost) => makeRequest.post("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // Corrected for v5
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if(file) imgUrl = await upload();
    mutation.mutate({desc, img:imgUrl});
    setDesc("");
    setFile(null);
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic!==null && `/upload/${currentUser.profilePic}`} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e)=>{setDesc(e.target.value)}}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img src={URL.createObjectURL(file)} className="file" alt=""  />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e)=>{setFile(e.target.files[0])}} //0 means single file
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;