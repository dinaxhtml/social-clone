import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';


const Stories = () => {
    const {currentUser}= useContext(AuthContext);
    //TEMP
    const stories= [
        {
            id:1,
            name: "Jane Doe",
            img: "https://images.pexels.com/photos/22203890/pexels-photo-22203890/free-photo-of-coffee-with-whipped-cream.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id:2,
            name: "Jane Doe",
            img: "https://images.pexels.com/photos/22203890/pexels-photo-22203890/free-photo-of-coffee-with-whipped-cream.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id:3,
            name: "Jane Doe",
            img: "https://images.pexels.com/photos/22203890/pexels-photo-22203890/free-photo-of-coffee-with-whipped-cream.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id:4,
            name: "Jane Doe",
            img: "https://images.pexels.com/photos/22203890/pexels-photo-22203890/free-photo-of-coffee-with-whipped-cream.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ];

    return (
        <div className='stories'>
            <div className="story">
                    <img src={"/upload/"+currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                    <button>+</button>
                </div>
            {stories.map(story=>(
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    );
}

export default Stories;