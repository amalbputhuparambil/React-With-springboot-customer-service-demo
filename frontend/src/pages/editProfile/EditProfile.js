import React, { useState,useEffect } from 'react';
import '../editProfile/EditPro.css';
import axios from 'axios';
import { baseURL } from '../../BaseUrl/BaseUrl';
import NavLogined from '../user/navbar/NavLogined';

function EditProfile() {
    const val=localStorage.getItem('token')
    const [info, setInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await axios.get(baseURL + '/current-user', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${val}`
              }
            });
            
            const userData = response.data;
            setInfo({
              userName: userData.username,
              firstName: '',
              lastName: '',
             phoneNumber: '',
             email: ''
            });
          } catch (error) {
            console.log('error :', error);
          }
        };
    
        fetchProfile(); 
    
      }, []); 
    
   

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const updateInfo = async (e) => {
        e.preventDefault();
        
        let valid = true;
        const newErrors = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        };

        if (!info.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            valid = false;
        }

        if (!info.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            valid = false;
        }

        if (!info.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(info.email.trim())) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        if (!info.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Mobile number is required';
            valid = false;
        } else if (!/^\d{10}$/.test(info.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Invalid mobile number';
            valid = false;
        }

        if (valid) {
            console.log(info);
          
        } else {
            setErrors(newErrors);
        }
        try{
         if(valid){
            console.log(info);
            const response=await axios.put(baseURL+'/updateUser',info,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${val}`
                  }
            })
          
           alert('successfully completed') }
          
           
        }catch(error){
         console.log('error :', error);

        }
         };
   

    return (
        <div>
            <NavLogined />
            <div className="container">
                <h2>Update User Details</h2>
                <form onSubmit={updateInfo}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder={info.firstName}
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder={info.lastName}
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            onChange={(e) => setInfo({ ...info, email: e.target.value })}
                            type="email"
                            id="email"
                            name="email"
                            placeholder={info.email}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Mobile Number:</label>
                        <input
                            onChange={(e) => setInfo({ ...info, phoneNumber: e.target.value })}
                            type="text"
                            id="number"
                            name="number"
                            placeholder={info.phoneNumber}
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
