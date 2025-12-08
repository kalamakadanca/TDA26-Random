import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";
import type {Course} from "../Types/Course.ts";
import CreateCourseModal from "../Components/CourseComponents/CreateCourseModal.tsx";

export default function Dashboard() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchCourses = async () => {
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
            const returnUrl = encodeURIComponent(location.pathname + location.search);
            window.location.href = `/login?returnUrl=${returnUrl}`;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [navigate]);

    /*const handleDelete = async (uuid: string) => {
        setIsLoading(true);
        try {
            await axios.delete(`http://localhost:5196/api/courses/${uuid}`);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
            fetchCourses();
        }
    }
    */
    const handleEdit = (uuid: string) => {
        navigate(`/courses/edit/${uuid}`);
    }

    return <div className="container h-full p-5">
        {isLoading && <LoadingSpinner/>}
        {isModalOpen && <CreateCourseModal onClose={() => setIsModalOpen(false)}/>}

        <div className="flex flex-row items-center justify-between pb-5">
            <h1 className="text-3xl">Správa úkolů</h1>

            <div className="h-full flex justify-center items-center">
                <button className="bg-blue-300 p-2 rounded flex flex-row items-center gap-2"
                        onClick={() => setIsModalOpen(true)}>
                    <img className="size-5" src="/plus_ikona.svg"/>
                    Nový kurz
                </button>

            </div>
        </div>
        <table className="w-full bg-blue-100 rounded shadow">
            <thead className="bg-blue-200 rounded">
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
                            <button className="p-1 m-1 bg-blue-300 rounded"
                                    onClick={() => handleEdit(course.uuid)}>Upravit
                            </button>
                            {/* TODO: Nahradit ikonou */}
                        </div>
                    </td>
                </tr>
            ))}

            </tbody>
        </table>

    </div>;
};