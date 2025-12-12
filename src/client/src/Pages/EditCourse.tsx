import {useEffect, useState} from "react";
import type {Course} from "../Types/Course.ts";
import {CourseService} from "../Services/courseService.ts";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";
import EditSideBar from "../Components/CourseComponents/EditSideBar.tsx";
import {useSearchParams} from "react-router-dom";
import * as module from "node:module";

const uuid = window.location.pathname.split("edit/")[1];

export default function EditCourse() {
    const [isLoading, setIsLoading] = useState(false);
    const [course, setCourse] = useState<Course | null>(null);
    const [title, setTitle] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedModuleId = searchParams.get("module")
    
    
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
    
    const changeModule = (uuid: string) => {
        setSearchParams(prev => {
            prev.set("module", uuid);
            return prev;
        })
    }
    
    const deleteModule = () => {
        
    }
    
    const createModule = () => {
        
    }

    if (isLoading) {
        return <div className="container justify-center flex">
            {isLoading && <LoadingSpinner/>}

        </div>;
    } else if (course == null) {
        return <div className="container flex items-center justify-center">
            <h3>Nastala chyba! Kurz nebyl nazelezen :(</h3>
        </div>
    } else if (selectedModuleId == null){
        
        return <div className="w-full h-full flex flex-row">
            <EditSideBar modules={course.modules} onChangeModule={changeModule} onCreateModule={createModule} onDeleteModule={deleteModule} selectedModuleId={selectedModuleId}></EditSideBar>
            
            <div className="container flex justify-center">
                <input type="text" value={course.title}/>
                
            </div>
        </div>
    }
    else{
        const selectedModule = course.modules.find(module => module.uuid === selectedModuleId);

        if (selectedModule != null) {
            return <div className="w-full h-full flex flex-row">
                <EditSideBar modules={course.modules} onChangeModule={changeModule} onCreateModule={createModule} onDeleteModule={deleteModule} selectedModuleId={selectedModuleId}></EditSideBar>

                <div className="container flex justify-center">
                    <h3>{selectedModule.title}</h3>

                </div>
            </div>;
        }

    }
}