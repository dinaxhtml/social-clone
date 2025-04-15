import {db} from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register= (req,res) => {
    //check if user exists
    const q= "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err,data) =>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists!");
        //else create a new user
          //hash the password
        try {
            const salt= bcrypt.genSaltSync(10);
            const hashedPassword= bcrypt.hashSync(req.body.password, salt);

            const q= "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";

            const values =[req.body.username, req.body.email, hashedPassword, req.body.name];
            db.query(q, [values], (err, data)=> {
                if(err) return res.status(500).json(err);
                return res.status(200).json("User has been created.");
            })
        } catch (error) {
            return res.status(500).json({ error: "Error hashing password", details: error.message });
        }
    });
}

export const login= (req,res)=> {
    const q= "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) =>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        const checkPassowrd= bcrypt.compareSync(req.body.password, data[0].password);

        if(!checkPassowrd) return res.status(400).json("Incorrect password or username!");
        //generates a JWT token to authenticate user.
        const token = jwt.sign({id: data[0].id}, "secretkey");
        //seperate user passowrd from other attributes to not send it
        //removes the password field from the response to prevent it from being sent back to the client.
        const {password, ...others} = data[0];
        // the token is stored in a cookie so the user stays logged in without needing to re-enter credentials.
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(others);
        //httpOnly: true => prevents JavaScript from accessing the cookie, improving security.
    });
}

export const logout= (req,res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.");
}