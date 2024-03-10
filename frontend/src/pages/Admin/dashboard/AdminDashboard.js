import React from 'react'
import '../dashboard/Dashboard.css'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div> <body>
      <Navbar />
    <header>
      <h1>Dashboard</h1>
    </header>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Reports</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
    <main>
    
    </main>
    <footer>
      <button className='button'><Link to={'/userlist'}>Users List </Link></button>
      <p>Contact</p>
      <button className='button'>Sales </button>
      <p>About</p>
      <button className='button'>Reports</button>
    
      
    </footer>
  </body></div>
  )
}

export default AdminDashboard