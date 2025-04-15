import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useTheme } from "../context/ThemeContext";

const Navbar= ()=> {
    const { theme, toggleTheme } = useTheme(); // Get theme state and toggle function
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                <span>SocialClone</span>
                </Link>
                <HomeOutlinedIcon/>
                
                {theme === "light" ? (<DarkModeOutlinedIcon onClick={toggleTheme} style={{ cursor: "pointer" }} />) 
                :(<WbSunnyOutlinedIcon onClick={toggleTheme} style={{ cursor: "pointer"}} />
                )}

                <GridViewOutlinedIcon/>
                <div className="search">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon/>
                <EmailOutlinedIcon/>
                <NotificationsNoneOutlinedIcon/>
                <div className="user">
                    <img src={"/upload/"+currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;