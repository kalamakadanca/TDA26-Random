import type {Course} from "../Types/Course.ts"

const uuid = window.location.pathname.split("courses/")[1];
export default function Course() {
    return <div className="container flex h-full flex-col items-center">
        <h1 className="text-3xl">{"Úvod"}</h1>
    </div>
};