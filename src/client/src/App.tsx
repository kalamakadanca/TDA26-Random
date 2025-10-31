import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home.tsx";
import Courses from "./Pages/Courses.tsx";

export default function App() {
    return <div className="w-full h-full flex">
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/courses" element={<Courses/>}></Route>
            </Routes>
        </Router>
    </div>
};