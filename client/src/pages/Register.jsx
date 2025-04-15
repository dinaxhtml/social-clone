import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs,setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  });

  const [err,setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange= (event)=> {
    setInputs((prev)=>({
      ...prev, [event.target.name]:event.target.value
    }));
  };

  const handleClick= async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/"); //redirect to home after success
    } catch (err) {
      setErr(err.response.data); //errors defined in our server api
      // console.log(err);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Media Clone.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam perferendis placeat et laboriosam, adipisci, assumenda laudantium hic dicta ut aliquid recusandae at, voluptates deleniti architecto animi ea deserunt dolorem. Sunt!</p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form action="">
            <input type="text" name="username" onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            <input type="text" name="name" onChange={handleChange} placeholder="Name" />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register