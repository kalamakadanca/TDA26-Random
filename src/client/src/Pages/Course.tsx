import type {Course} from "../Types/Course.ts"
import {useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";

const uuid = window.location.pathname.split("courses/")[1];

export default function Course() {
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        setIsLoading(true);
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`http://localhost:5196/api/courses/${uuid}`);

                if (res.status == 200) {
                    setCourse(res.data);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);

            }

        };
        fetchCourse();

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
            
        </div>;
    }

};