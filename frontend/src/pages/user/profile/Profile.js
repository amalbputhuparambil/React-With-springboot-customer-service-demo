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
  const[image,setImage]=useState('');

  

  const handleChange = async (e) => {
    e.preventDefault(); 

    try {
      const selectedFile = e.target.files[0];
    
      setFile({ image: URL.createObjectURL(selectedFile) });
      setphoto({image:selectedFile})
     console.log('hiiiiiiiiiiiiiiiiiii',selectedFile);
     
      const formData = new FormData();
      formData.append('image', selectedFile);
     
       console.log('photo result :',formData.get('image'));
      await axios.post(baseURL +'/addimg', formData, {
        headers: {
          'content-type': 'multipart/file',
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
    const fetcchimage = async () => {
      try {
        const response = await axios.get(baseURL + '/getImage', {
          headers: {
            'content-type':'multipart/file',
            Authorization: `Bearer ${token}`
          }
        });
    
        if (response.data) {
          const blob = new Blob([response.data], { type: 'image/jpg' });
          const imageUrl = URL.createObjectURL(blob);
          setImage(imageUrl);
          console.log("Image URL:", imageUrl);
        } else {
          console.log("No image data found in the response.");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log('Error:', error.response.data);
        } else {
          console.log('Error:', error.message);
        }
      }
    };
    

    
    fetcchimage();

    fetchProfile();

  }, []);
  console.log ( userDetails.Number);
  return (
    <div className="card">
      <div className="App">
      <img  style={{ width: '100%',height:'50px' }} src={image}/>
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
