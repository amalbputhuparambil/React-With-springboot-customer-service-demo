import React, { useState, useEffect } from 'react';
import '../profile/profile.css';
import { Link, Navigate } from 'react-router-dom';
import { baseURL } from '../../../BaseUrl/BaseUrl';
import axios from 'axios';

function Profile() {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    Number: '',
    mail: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(baseURL + '/current-user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        
        const userData = response.data;
        setUserDetails({
          userName: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          Number: userData.phoneNumber,
          mail: userData.email
        });
      } catch (error) {
        console.log('error :', error);
      }
    };

    fetchProfile(); 

  }, []); 

  return (
    <div className="card"> 
      <img  src='profilePic.png'/>  
      <h1>{userDetails.userName}</h1>
      <p className="title">{userDetails.firstName}, {userDetails.lastName}</p>
      <p>{userDetails.mail}</p>
      <p>{userDetails.Number}</p>

      <p> <Link to={'/editProfile'}><button >edit</button></Link> </p>
      <p><button><Link to={'/'} style={{color:"white"}}>Home</Link></button></p>
    </div>
  );
}

export default Profile;
