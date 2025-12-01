import type {Course} from "../Types/Course.ts";

interface Props {
    course: Course;
}

export default function DashboardCoursePreview({course}: Props) {

    return <tr>
        <td>{course.title}</td>
        <td>{course.uuid}</td>
        <td>{course.description}</td>
        <td>{course.description}</td>
    </tr>;
};