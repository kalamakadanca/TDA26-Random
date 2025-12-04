import type {Course} from '../../Types/Course.ts'

interface Props {
    course: Course
}

export default function CoursePreview({course}: Props) {
    const handleClick = async () => {
        TODO: window.location.href = `courses/${course.uuid}`
    }
    return <div className="flex w-1/3 h-1/3 hover:scale-105 transition-transform ease-in-out duration-150 justify-center items-center
        bg-blue-100 flex-col m-3 p-3 rounded-xl" onClick={handleClick}>
        <div className="w-full">
            <h2>{course.uuid}</h2>
        </div>
        <div className="w-full">
            <h2>{course.title}</h2>
        </div>
        
        <div>
            <p>{course.description}</p>
        </div>
    </div>
};