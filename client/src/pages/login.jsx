/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import axios from 'axios';
import "../CSS/login.css";
import Baniyaimage from "../images/Tree life-rafiki.png";
import { useNavigate } from 'react-router-dom';

function signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // useNavigate replace

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:9000/api/auth/login", {
                email, password
            }
            );

            //store the token in local storage
            localStorage.setItem("token", response.data.token);
            //navigate to the home page
            navigate("/home");
        } catch (error) {
            console.error("Login failed", error);
            if (error.response) {
                alert(`Login failed: ${error.response.data.error}`);
            }
            else {
                alert("Login Failed : Network error or server not reachable");
            }
        }
    };

    return (
        <div className='login'>
            <div className='logo'>
                <img src={Baniyaimage} alt="baniya code " />
                <p>Baniya's Code</p>
                <p>Universe</p>
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
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
                        Login
                    </button>
                </form>
                <div className='link'><p>Don't have an account{" "}?{" "}<u><a href='/signup'>Create one</a></u></p></div>
            </div>
        </div>
    )
}

export default signup