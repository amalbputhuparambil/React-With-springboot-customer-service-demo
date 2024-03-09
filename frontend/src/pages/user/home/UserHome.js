import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLogined from "../navbar/NavLogined";



function UserHome() {
  const navigate=useNavigate();
    const [token,setToken]=useState(null)
    function clearAllCookies() {
      const cookies = document.cookie.split(";");
    
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
    }
    
    // Usage
 
    
  
  useEffect(()=>{
    clearAllCookies();

   setToken( localStorage.getItem('token'))
  },[])
 
  if(!token){
navigate('/login')

  }

  return (
  
    <div>
  {token ?(
    <div style={{backgroundColor:"black",color:"white",height:"70%"}}>
      <NavLogined/>
      <div className="col-md-12 mb-4">
        <span >
         
        </span><span/><span/><span/>
        <h4>
       <span/><span/><span/>
          <strong>Home Page </strong>
        </h4>
        <p className="text-muted">
     
          <div style={{color:"white"}}>
          <p>
        Welcome to our website! We are delighted to have you here, and we extend our warmest greetings as you embark on a journey through our digital domain. As you step into our virtual realm, we invite you to immerse yourself in an experience crafted with care and dedication, designed to cater to your interests and needs.
We understand that your time is precious, which is why we've endeavored to make your visit as seamless and enjoyable as possible. Our website is designed with user-friendliness and accessibility in mind, ensuring that you can easily find what you're looking for and navigate our pages with ease. Whether you're accessing our site from a desktop computer, a tablet, or a mobile device, you can expect a consistent and optimized experience across all platforms.
</p>
<p>
As you journey through our website, we hope you'll discover something new and exciting with each click. Whether it's a hidden gem tucked away in the depths of our archives or a groundbreaking feature that pushes the boundaries of technology, we're committed to keeping you engaged, informed, and entertained every step of the way.

Thank you for choosing to visit our website. We're thrilled to have you here, and we look forward to accompanying you on this digital adventure. So sit back, relax, and let your curiosity be your guide as you embark on a journey of discovery with us. Welcome aboard!
</p>
</div>


        </p>
       
    
          <>
            <Link style={{backgroundColor:"white"}}type="button" className="btn btn-outline-dark" to="/profile">
              {" "}
              view profile{" "}
            </Link>
          </>
        
      </div>
    </div>
  ):null}
    </div>
  
  );
}

export default UserHome;
