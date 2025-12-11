import type {Module} from "../../Types/Module.ts";

interface Props {
    modules : Module[];
    onChangeModule: (uuid: string) => void;
    selectedModuleId: string | null;
}

export default function ModuleSideBar({modules, onChangeModule, selectedModuleId} : Props) {
    
    
    return <div className="w-52 h-full bg-blue-50 border-r shadow border-blue-200">
        <div className="pb-3 pt-3 mr-3 ml-3 border-b border-gray-300">
            <h2 className="text-2xl">Moduly</h2>
        </div>
        <ul>
            {modules.map((module) => (
                <li key={module.uuid} className={selectedModuleId == module.uuid ? "w-full h-full flex p-3 items-center hover:bg-blue-200 bg-blue-100 rounded cursor-pointer"
                : "w-full h-full flex p-3 items-center hover:bg-blue-200  rounded cursor-pointer"} onClick={() => onChangeModule(module.uuid)}>{module.title}</li>
            ))}
        </ul>
    </div>
};