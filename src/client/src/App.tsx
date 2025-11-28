import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home.tsx";
import Courses from "./Pages/Courses.tsx";
import NavBar from "./Components/NavBar.tsx";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import Course from "./Pages/Course.tsx";
import Dashboard from "./Pages/Dashboard.tsx";

export default function App() {
    return <div className="w-screen h-screen items-center justify-center flex flex-col">
        <Router>
            <div className="flex w-full ">
                <NavBar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/courses" element={<Courses/>}></Route>
                <Route path="/courses/:uuid" element={<Course/>}/>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
            </Routes>
        </Router>
    </div>;
};