import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { toast } from "react-hot-toast";
import { registerUser } from "../store/authSlice";
import { auth } from "../firebase.config";
import { FormControl, TextField, Button } from "@mui/material";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        toast.error("User already registered");
        return;
      }

      // Dispatch the register action if the user is not registered
      await dispatch(registerUser({ displayName, email, password }));

      toast.success("Sign Up success");
      navigate("/login");
    } catch (err) {
      return;
      console.error("Error checking user registration:", err);
      alert("Error checking user registration");
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center pt-10">Register  <label className='text-blue-500 under'>Here</label> </h1>

      <form onSubmit={handleRegister} className="flex flex-col w-1/3 rounded mt-16 m-auto space-y-7 pt-16 my-auto bg-slate-100 p-4">
        <TextField
          type="text"
          variant="standard"
          placeholder="Enter your name "
          required
          autoComplete="on"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          type="email"
          variant="standard"
          placeholder="Email"
          required
          value={email}
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          variant="standard"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" className="" onClick={handleRegister} type="submit">
          Sign Up
        </Button>
        <Link to="/login" className='text-center underline text-blue-500'> Login here  </Link>
        {error && <>Error in registering</>}
      </form>
    </>
  );
}

export default Register;
