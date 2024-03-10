import React, { useEffect, useState } from 'react';
import '../userList/Listuser.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { baseURL } from '../../../BaseUrl/BaseUrl';
import { Link, useNavigate } from 'react-router-dom';
import EditUser from '../useredit/EditUser';

function ListUser() {
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const[userData,setUserData]=useState('')
    const navigate=useNavigate();
    const [searchdata,setSearch]=useState('');

    useEffect(() => {

    
        const getData = async () => {
            try {
                const response = await axios.get(baseURL + '/getAll', {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
                
            } catch (error) {
                console.log('error :', error);
            }
        }
    
        getData();
    }, []);
    const deleteUser=async(id)=>{
       
        try {
            console.log(id);
     const res = await axios.put(baseURL+'/deleteUser',id,{
        headers:{
            'content-type' : 'application/json',
            Authorization:`Bearer ${token}`
        }
     })
     setUsers(users.filter(user => user.id !== id));   
        } catch (error) {
       console.log('error : ', error);            
            }
            
        }
  const editUser =async(id)=>{

   localStorage.setItem('id',id);
   console.log(localStorage.getItem('id'));
navigate('/edituser')
  }
  const searchfunction = async (e) => {
    e.preventDefault();
    console.log('search data:', searchdata);
    console.log(token);
    try {
        const formdata=new FormData();
        formdata.append('name',searchdata)
        console.log(formdata);
      const response = await axios.put(baseURL+ '/search',formdata, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
    

    return (
        <div>
            <Navbar />
            <div style={{backgroundColor:'#6870ae',textAlign:'center'}}>  
             
             <form onSubmit={searchfunction}>      
                  <input  type='text' placeholder='type here.....' onChange={(e)=>{setSearch(e.target.value)}}/><button  style={{width:'10%'}}>Search</button>
                  
                  </form>
                 
                  
            </div>

            <h1 className='heading'>List of users</h1>
            <div className='space'></div>
            <button style={{background:'darkblue'}}><Link to={'/adduser'}>add new user</Link></button>
            <div className='space'></div>
            <table>
                <thead>
                    <tr>
                     
                        <th>userName</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>delete</th>
                        <th>edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.Number}</td>
                            <td><button onClick={()=>deleteUser(user.id)}>Delete</button></td>
                            <td><button onClick={()=>editUser(user.id)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListUser;
