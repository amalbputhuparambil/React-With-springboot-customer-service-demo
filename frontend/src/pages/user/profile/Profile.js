import React, { useState, useEffect } from 'react';
import '../profile/profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../../../BaseUrl/BaseUrl';
import axios from 'axios';

function Profile() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [file, setFile] = useState({ image: null });
  const[photo,setphoto]=useState({image:''})
  

  const handleChange = async (e) => {
    e.preventDefault(); 

    try {
      const selectedFile = e.target.files[0];
    
      setFile({ image: URL.createObjectURL(selectedFile) });
      setphoto({image:selectedFile})
     
      const formData = new FormData();
      formData.append('image', selectedFile);
     
       console.log('photo result :',photo);
      await axios.put(baseURL +'/addimg', photo, {
        headers: {
          'content-type': 'multipart/photo',
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log('error:', error);
    } 
  };
  const [userDetails, setUserDetails] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    Number: '',
    email: ''
  });

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
          email: userData.email 
        });
      } catch (error) {
        console.log('error:', error);
      }
    };

    fetchProfile();
  }, []);
  console.log ( userDetails.Number);
  return (
    <div className="card">
      <div className="App">
        {file.image ? <img style={{ width: '100%' }} src={file.image} alt="Profile" /> : <img src="profilePic.png" alt="Default Profile" />}
        <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="file" onChange={handleChange} />
          
          </div>
        </form>
      </div>
       <div style={{color:'black'}}>
      <h1>{userDetails.userName}</h1>
      <p className="title">{userDetails.firstName} {userDetails.lastName}</p>
      <p>{userDetails.email}</p>
      <p>{userDetails.Number}</p>
      </div>

      <p> <Link to={'/editProfile'}><button>edit</button></Link> </p>
      <p><button><Link to={'/home'} style={{ color: "white" }}>Home</Link></button></p>
    </div>
  );
}

export default Profile;
