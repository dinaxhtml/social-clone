import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const {login} = useContext(AuthContext);
  const [inputs,setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  });
  
  const [err,setErr] = useState(null);
  const navigate= useNavigate();

  const handleChange= (event)=> {
    setInputs((prev)=>({
      ...prev, [event.target.name]:event.target.value
    }));
  };

  const handleLogin= async (event)=> {
    event.preventDefault();
    try {
      await login(inputs); //from authContext
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam perferendis placeat et laboriosam, adipisci, assumenda laudantium hic dicta ut aliquid recusandae at, voluptates deleniti architecto animi ea deserunt dolorem. Sunt!</p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input type="text" name="username" onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login