/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import "../CSS/signup.css";
import Baniyaimage from "../images/Tree life-rafiki.png";
import authService from '../service/authservise';
import { useNavigate } from 'react-router-dom';

function signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate replace

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ username, email, password });
      navigate("/")
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className='signup'>
      <div className='logo'>
        <img src={Baniyaimage} alt="baniya code " />
        <p>Baniya's Code</p>
        <p>Universe</p>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <label>User Name
            <br />
            <input type='text' placeholder='User Name' value={username} onChange={(e) => setUsername(e.target.value)}
              required />
          </label>

          <br />

          <label>
            Email Address
            <br />
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <br />

          <label>
            Password
            <br />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <br />
          <button type='submit'>
            Sign Up
          </button>
        </form>
        <div className='link'> <p>Already have an account{" "}?{" "}<u><a href='/'>Log in</a></u></p></div>
      </div>
    </div>
  )
}

export default signup