import SideBar from "../Components/SideBar.tsx";
import {useState} from "react";
import type {Course} from "../Types/Course.ts";
import CoursePreview from "../Components/CoursePreview.tsx";

function Courses() {
    const [courses, setCourses] = useState<Course[]>(() => {
        const initialCourses: Course[] = [];
        for (let i = 0; i < 5; i++) {
            initialCourses.push({
                uuid: `${i}`, // 
                title: `Základy programování ${i}`,
                description: "V tomto kurzu se naučíte všechno potřebné o programování v TypeScriptu",
                text_content: ["Toto je první odstavec je tady všechno možné!", "Toto je už dokonce druhý odstavec a jsou tatdy totální blbosti, ale potřebuji sem něco napsat na testování"]
            });
        }
        return initialCourses;
    });

    return <div className="w-full h-full flex flex-row">
        <SideBar/>

        <div className="container flex">

            {courses.map((course) => (
                <CoursePreview key={course.uuid} course={course}></CoursePreview>
            ))}
        </div>
    </div>
}

export default Courses;