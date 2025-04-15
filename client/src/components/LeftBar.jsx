import Friends from "../../src/assets/1.png";
import Groups from "../../src/assets/2.png";
import Market from "../../src/assets/3.png";
import Watch from "../../src/assets/4.png";
import Memories from "../../src/assets/5.png";
import Events from "../../src/assets/6.png";
import Gaming from "../../src/assets/7.png";
import Gallery from "../../src/assets/8.png";
import Videos from "../../src/assets/9.png";
import Messages from "../../src/assets/10.png";
import Tutorials from "../../src/assets/11.png";
import Courses from "../../src/assets/12.png";
import Fund from "../../src/assets/13.png";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar= ()=> {
    const {currentUser} = useContext(AuthContext);
    // console.log(currentUser.profilePic);

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={"/upload/"+currentUser.profilePic} alt="" />
                        <Link to={`/profile/${currentUser.id}`} style={{textDecoration: "none", color:"inherit"}}>
                            <span className='name'>{currentUser.name}</span>
                        </Link>
                    </div>
                    <div className="item">
                        <img src={Friends} alt="" />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt="" />
                        <span>Market</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr/>
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={Events} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt="" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr/>
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Tutorials} alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt="" />
                        <span>Courses</span>
                    </div>
                    <div className="item">
                        <img src={Fund} alt="" />
                        <span>Fundraiser</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;