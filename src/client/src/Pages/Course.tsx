import type {Course} from "../Types/Course.ts"
import {useEffect, useState} from "react";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";
import {CourseService} from "../Services/courseService.ts";

const uuid = window.location.pathname.split("courses/")[1];

export default function Course() {
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const data = await CourseService.getCourseByUuid(uuid);

                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourses();
    }, []);

    if (isLoading) {
        return <div className="container flex h-full flex-col items-center justify-center">
            <LoadingSpinner/>
        </div>;
    } else if (course == null) {
        return <div className="container flex h-full flex-col items-center justify-center">
            <h1 className="text-3xl">Je nám líto, ale hledaný kurz nebyl nalezen</h1>
        </div>;
    } else {
        return <div className="container flex h-full flex-col items-center">
            <h1>{course.title}</h1>
        </div>;
    }

};