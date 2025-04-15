import "../style/main.css";

const RightBar= ()=> {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggestions For You</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/30455566/pexels-photo-30455566/free-photo-of-elegant-yellow-floral-arrangement-in-gift-box.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/30455566/pexels-photo-30455566/free-photo-of-elegant-yellow-floral-arrangement-in-gift-box.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/30455566/pexels-photo-30455566/free-photo-of-elegant-yellow-floral-arrangement-in-gift-box.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/30455566/pexels-photo-30455566/free-photo-of-elegant-yellow-floral-arrangement-in-gift-box.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                            <p><span>Jane Doe</span> liked a post</p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/30455566/pexels-photo-30455566/free-photo-of-elegant-yellow-floral-arrangement-in-gift-box.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                            <p><span>Jane Doe</span> liked a comment</p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/30455566/pexels-photo-30455566/free-photo-of-elegant-yellow-floral-arrangement-in-gift-box.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                            <p><span>Jane Doe</span> posted</p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="item">
                    <span>Online Friends</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/30455566/pexels-photo-30455566/free-photo-of-elegant-yellow-floral-arrangement-in-gift-box.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                            <div className="online"></div>
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/30455566/pexels-photo-30455566/free-photo-of-elegant-yellow-floral-arrangement-in-gift-box.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                            <div className="online"></div>
                            <span>Jane Doe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar;