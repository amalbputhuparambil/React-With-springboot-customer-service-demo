import React from 'react'
import '../navbar/Navbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../../BaseUrl/BaseUrl'
import Cookies from 'js-cookie'

function NavLogined() {
const token=localStorage.getItem('token')
  
    const logout = async () => {
        try {
            await axios.get(baseURL + '/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
    
        } catch (error) {
            console.log('error :', error);
        }
    };
    
  return (
    <div>
         <div class="topnav">
  <Link class="active" to={'/'}>Home</Link>
  <Link onClick={logout}  to={'/login'}>logout</Link>
  <Link to={'/profile'}>profile</Link>
  
</div>
    </div>
  )
}

export default NavLogined