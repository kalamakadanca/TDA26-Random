import SideBar from "../Components/SideBar.tsx";
import {useState} from "react";

interface Course {
    title: string,
    description: string
    text_content: string[]
}


function Courses() {
    const [courses, setCourses] = useState<Course[]>(() => {
        const initialCourses: Course[] = [];
        for (let i = 0; i < 5; i++) {
            initialCourses.push({
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
                <div key={course.title}>
                    {course.title}
                </div>
            ))}
        </div>
    </div>
}

export default Courses;