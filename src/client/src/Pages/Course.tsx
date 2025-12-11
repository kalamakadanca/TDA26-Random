import type {Course} from "../Types/Course.ts"
import {useEffect, useState} from "react";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";
import {CourseService} from "../Services/courseService.ts";
import ModuleSideBar from "../Components/CourseComponents/ModuleSideBar.tsx";
import {useSearchParams} from "react-router-dom";

const uuid = window.location.pathname.split("courses/")[1];


export default function Course() {
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedModuleId = searchParams.get("module")

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
    }, [uuid]);

    const changeModel = (uuid: string) => {
        setSearchParams(prev => {
            prev.set("module", uuid);
            return prev;
        })
    }

    if (isLoading) {
        return <div className="container flex h-full flex-col items-center justify-center">
            <LoadingSpinner/>
        </div>;
    } else if (course == null) {
        return <div className="container flex h-full flex-col items-center justify-center">
            <h1 className="text-3xl">Je nám líto, ale hledaný kurz nebyl nalezen</h1>
        </div>;
    } else {

        const selectedModule = course.modules.find(module => module.uuid === selectedModuleId);

        return <div className="h-full w-full flex flex-row">
            <ModuleSideBar modules={course.modules} onChangeModule={changeModel} selectedModuleId={selectedModuleId}/>
            <div className="container flex h-full flex-col items-center">
                {selectedModule 
                    ? (
                        <div>{selectedModule.title}</div>
                    ) :
                    (
                        
                        <div>Module není načtený</div>
                    )}
            </div>
        </div>;
    }

};