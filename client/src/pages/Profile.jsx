import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../components/Posts';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import Update from "../components/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const userId = useLocation().pathname.split("/")[2];

  const { isLoading, error, data = {} } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId, {
        withCredentials: true,
      }).then((res) => {
        console.log("User data response:", res.data);
        return res.data;
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        return {};
      }),
    refetchOnWindowFocus: false,
  });

  const { isLoading: rIsLoading, data: relationshipData = [] } = useQuery({
    queryKey: ["relationship", userId], // Add userId to make this key unique
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId, {
        withCredentials: true,
      }).then((res) => {
        console.log("Relationship data response:", res.data);
        return res.data;
      }),
    refetchOnWindowFocus: false,
  });

  // Move mutation hook outside of any conditional logic
  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationship', userId] }); // Include userId in the key
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  // Handle loading state outside of the JSX
  if (isLoading) return <div className="profile">Loading...</div>;

  return (
    <div className="profile">
      <div className="images">
        <img className='cover' src={"/upload/"+data.coverPic} alt="" />
        <img className='profilePic' src={"/upload/"+data.profilePic} alt="" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="https://instagram.com">
              <InstagramIcon fontSize='large' />
            </a>
            <a href="https://x.com">
              <XIcon fontSize='large' />
            </a>
            <a href="https://linkedin.com">
              <LinkedInIcon fontSize='large' />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageOutlinedIcon />
                <span>{data.website}</span>
              </div>
            </div>
            {rIsLoading ? (
              "Loading.."
            ) : userId == currentUser.id ? (
              <button onClick={()=> setOpenUpdate(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
};

export default Profile;