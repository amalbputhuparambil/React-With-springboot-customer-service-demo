import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./pages/user/login/UserLogin";
import UserHome from "./pages/user/home/UserHome";
import UserRegister from "./pages/user/signup/UserRegister";
import Profile from "./pages/user/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";





function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<UserHome/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/signup" element={<UserRegister/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>

        </Routes>
    </Router>
  );
}

export default App;
