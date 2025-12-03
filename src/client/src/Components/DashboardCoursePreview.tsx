import type {Course} from "../Types/Course.ts";

interface Props {
    course: Course;
}

export default function DashboardCoursePreview({course}: Props) {
    const handleClick = () => {
        
    };
    return <tr>
        <td className="flex justify-center">{course.title}</td>
        <td className="flex justify-center">Veřejné</td>
        <td className="flex justify-center">
            <button onClick={handleClick}></button>
        </td>
    </tr>;
};