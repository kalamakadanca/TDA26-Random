import SideBarItem from "./SideBarItem.tsx";

export default function SideBar() {
    return <div className="w-52 h-full bg-blue-50 border-r shadow border-blue-200">
        <div className="pb-3 pt-3 mr-3 ml-3 border-b border-gray-300">
            <h2 className="text-2xl">Kategorie</h2>

        </div>
        <ul>
            <li>
                <SideBarItem></SideBarItem>
            </li>
        </ul>
    </div>;
};