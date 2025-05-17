/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import authservise from '../service/authservise';


const home_page =() =>{
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await authservise.getUserData();
                setEmail(userData.email);
                setUsername(userData.username);
            } catch (err) {
                console.error("Failed to fetch user data", err);
            }

        };
        fetchUserData();
    },[]);
  return (
      <div>home_page
          <p>User Email Address :{" "}{email}</p>
          <p>User Name :{" "}{username}</p>
    </div>
  )
}

export default home_page