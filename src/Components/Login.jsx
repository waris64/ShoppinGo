import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        const { uid, email, displayName } = resultAction.payload;
        toast.success(`Login Successful, Welcome ${displayName || 'User'}!`);
        navigate('/');
      } else {
        toast.error(`LogIn failed: ${resultAction.payload || resultAction.error.message}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center pt-10">Sign <label className='text-blue-500'>In</label> </h1>
      <form onSubmit={handleLogin} className="w-1/3 m-auto flex flex-col rounded gap-y-5 py-8  border px-5 bg-slate-100 mt-16">
        <TextField
          variant='standard'
          className="px-2 py-1 font-semibold "
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="on"
        />
        <TextField
          variant='standard'
          className="px-2 py-1 font-semibold "
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          variant="outlined"
          type="submit"
          onClick={handleLogin}
        >Login</Button>
        <Link to="/register" className='text-center underline text-blue-500'> Register here  </Link>

        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Login;
