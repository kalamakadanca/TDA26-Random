import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";
import type {Course} from "../Types/Course.ts";

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

    return <div className="container h-full p-5">
        {isLoading && <LoadingSpinner/>}

        <div className="flex flex-row items-center justify-between pb-5">
            <h1 className="text-3xl">Správa úkolů</h1>

            <div className="h-full flex justify-center items-center">
                <button className="bg-blue-300 p-2 rounded">Vytvořit kurz</button>

            </div>
        </div>
        <table className="w-full bg-blue-100 rounded shadow">
            <thead className="bg-blue-200">
            <tr className="p-3">
                <th></th>
                <th>Název</th>
                <th>Viditelnost</th>
                <th>Počet zapsaných</th>
            </tr>

            </thead>
            <tbody>

            {courses?.map((course) => (
                <tr key={course.uuid}>
                    <td>
                        <div className="flex justify-center items-center">
                            <input type="checkbox" className="scale-125"/>
                        </div>
                    </td>
                    <td>
                        <div className="flex justify-center">
                            {course.title}
                        </div>
                    </td>
                    <td>
                        <div className="flex justify-center">
                            {course.title}
                        </div>
                    </td>
                    <td>
                        <div className="flex justify-center">
                            <button className="p-1 m-1 bg-red-400 rounded">Odstranit</button>
                            {/* TODO: Nahradit ikonou */}
                        </div>
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
        
    </div>;
};