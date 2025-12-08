import {useEffect, useState} from "react";
import type {Course} from "../Types/Course.ts";
import {CourseService} from "../Services/courseService.ts";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";

const uuid = window.location.pathname.split("edit/")[1];

export default function EditCourse() {
    const [isLoading, setIsLoading] = useState(false);
    const [course, setCourse] = useState<Course | null>(null);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true);
            setCourse(await CourseService.getCourseByUuid(uuid));
            if (course != null) {
                setTitle(course.title);
            }
            setIsLoading(false);
        };

        fetchCourse();
    }, []);

    if (isLoading) {
        return <div className="container justify-center flex">
            {isLoading && <LoadingSpinner/>}

        </div>;
    } else if (course == null) {
        return <div className="container flex items-center justify-center">
            <h3>Nastala chyba! Kurz nebyl nazelezen :(</h3>
        </div>
    } else {
        return <div className="container flex justify-center">
            <div>
                <input type="text" value={course.title} className="text-2xl" onChange={(e) => set}/>
            </div>
        </div>
    }
}