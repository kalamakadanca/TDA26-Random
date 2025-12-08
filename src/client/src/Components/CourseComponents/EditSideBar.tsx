import type {Module} from "../../Types/Module.ts";

interface Props {
    modules: Module[];
}

export default function EditSideBar({modules}: Props) {
    return <div className="w-52 h-full bg-blue-50 border-r shadow border-blue-200">
        <div className="pb-3 pt-3 mr-3 ml-3 border-b border-gray-300">
            <h2 className="text-2xl">Moduly</h2>
        </div>
        <ul>
            {modules.map((module => (
                <li>{module.title}</li>
            )))}
        </ul>
    </div>;
};