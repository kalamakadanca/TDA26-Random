import type {Module} from "../../Types/Module.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    modules : Module[];
}

export default function ModuleSideBar({modules} : Props) {
    const navigate = useNavigate();
    
    return <div className="w-52 h-full bg-blue-50 border-r shadow border-blue-200">
        <div className="pb-3 pt-3 mr-3 ml-3 border-b border-gray-300">
            <h2 className="text-2xl">Moduly</h2>
        </div>
        <ul>
            {modules.map((module) => (
                <li key={module.uuid} className="w-full h-full flex p-3 items-center hover:bg-blue-200 rounded cursor-pointer" onClick={() => navigate(`/cou`)}>{module.title}</li>
            ))}
        </ul>
    </div>
};