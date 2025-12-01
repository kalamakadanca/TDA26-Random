import SideBar from "../Components/SideBar.tsx";
import type {Course} from "../Types/Course.ts";
import {useState, useEffect} from "react";
import axios from "axios";

function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const getCourses = async () => {
          const res = await axios.get("http://localhost:5196/courses");

            if (res.status == 200) {
                setCourses(res.data)
            }
        };

        getCourses();
    }, []);


    return <div className="w-full h-full flex flex-row">
        <SideBar/>

        <div className="container flex">

            {/* TODO: Vymyslet, ať se dá na řádek jenom 5 */}
            {courses.length}
        </div>
    </div>
}

export default Courses;