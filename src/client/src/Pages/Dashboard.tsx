import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";
import type {Course} from "../Types/Course.ts";
import DashboardCoursePreview from "../Components/DashboardCoursePreview.tsx";

export default function Dashboard() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<Course[] | null>(null);

    useEffect(() => {
        const check = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get('http://localhost:5196/api/auth/me', {withCredentials: true});

                if (res.status == 200) {
                    const fetchCourses = await axios.get('http://localhost:5196/api/courses');

                    if (fetchCourses.status == 200) {
                        setCourses(fetchCourses.data);
                    }
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                // TODO: Pro development jsem vypnul
                // const returnUrl = encodeURIComponent(location.pathname + location.search);
                // window.location.href = `/login?returnUrl=${returnUrl}`;
            } finally {
                setIsLoading(false);
            }
        };

        check();
    }, [navigate]);

    return <div className="container h-full">
        {isLoading && <LoadingSpinner/>}
        <table className="w-full h-full flex-row">
            <thead>
            <tr>
                <th>Název</th>
                <th>Viditelnost</th>
                <th>Počet zapsaných</th>
            </tr>

            </thead>
            <tbody>

            {courses?.map((course) => (
                        <DashboardCoursePreview course={course} key={course.uuid}/>
            ))}

            </tbody>
        </table>

    </div>
};