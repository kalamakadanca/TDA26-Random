import type {Module} from "../../Types/Module.ts";

interface Props {
    modules: Module[];
    selectedModuleId: string | null;
    onChangeModule: (moduleId: string) => void;
    onCreateModule: () => void;
    onDeleteModule: (moduleId: string) => void;
}

export default function EditSideBar({modules, selectedModuleId, onChangeModule, onDeleteModule, onCreateModule}: Props) {
    return <div className="w-52 h-full bg-blue-50 border-r shadow border-blue-200">
        <div className="pb-3 pt-3 mr-3 ml-3 border-b border-gray-300">
            <h2 className="text-2xl">Moduly</h2>
        </div>
        <ul>
            {modules.map((module) => (
                <li key={module.uuid}
                    className={selectedModuleId == module.uuid ? "w-full h-full flex p-3 items-center hover:bg-blue-200 bg-blue-100 rounded cursor-pointer"
                        : "w-full h-full flex p-3 items-center hover:bg-blue-200  rounded cursor-pointer"}
                    onClick={() => onChangeModule(module.uuid)}><div>
                    {module.title}
                    <button onClick={() => onDeleteModule(module.uuid)}>Odstranit</button>
                </div></li>
            ))}
            <li className="flex justify-center items-center w-full h-full">
                <button onClick={onCreateModule}>
                    Nový modul {/* Ještě přidat + ikonu */}
                </button>
            </li>
        </ul>
    </div>
};