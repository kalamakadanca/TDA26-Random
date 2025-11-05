import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home.tsx";
import Courses from "./Pages/Courses.tsx";
import NavBar from "./Components/NavBar.tsx";

export default function App() {
    return <div className="w-full h-full flex flex-col">
        <Router>
            <div className="flex w-full">
                <NavBar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/courses" element={<Courses/>}></Route>
            </Routes>
        </Router>
    </div>
};