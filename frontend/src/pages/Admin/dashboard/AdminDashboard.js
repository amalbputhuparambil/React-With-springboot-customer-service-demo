import React from 'react'
import '../dashboard/Dashboard.css'
import Navbar from '../Navbar/Navbar'

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
      <button className='button'>Users List</button>
      <p>Contact</p>
      <button>Sales </button>
      <p>About</p>
      <button>Reports</button>
    
      
    </footer>
  </body></div>
  )
}

export default AdminDashboard