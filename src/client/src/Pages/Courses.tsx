import CategorySideBar from "../Components/CourseComponents/CategorySideBar.tsx";
import type {Course} from "../Types/Course.ts";
import {useState, useEffect} from "react";
import axios from "axios";
import CoursePreview from "../Components/CourseComponents/CoursePreview.tsx";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";

function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const getCourses = async () => {
            try {
                const res = await axios.get("http://localhost:5196/api/courses");

                if (res.status == 200) {
                    setCourses(res.data)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }

        };

        getCourses();
    }, []);


    return <div className="w-full h-full flex flex-row">
        {isLoading && <LoadingSpinner/>}
        <CategorySideBar/>

        <div className="container flex">

            {courses.map((course: Course) => (
                <CoursePreview course={course} key={course.uuid}></CoursePreview>
            ))}
        </div>
    </div>
}

export default Courses;