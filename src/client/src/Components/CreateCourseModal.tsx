import axios from "axios";
import {useState} from "react";
import LoadingSpinner from "./LoadingSpinner.tsx";

interface Props {
    onClose: () => void;
}

export default function CreateCourseModal({onClose}: Props) {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<boolean | null>(null);
    
    const handleClose = () => {
        onClose();
    };


    const handleCreate = async () => {
        setIsLoading(true);
        setResult(null);

        try {
            const res = await axios.post('http://localhost:5196/api/courses', `"${title}"`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status == 200) {
                setResult(true);
                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 1000);
            }
        } catch (error) {
            setResult(false);
            
        }
        finally {
            setIsLoading(false);
        }


    };

    return <div className="fixed flex justify-center items-center top-0 left-0 w-screen bg-gray-500/50 h-screen z-40">
        {isLoading && <LoadingSpinner/>}
        <div
            className="flex bg-white w-1/3 h-fit p-5 relative z-50 shadow-2xl flex-col items-center rounded-xl border-b border-gray-400">
            <div className="w-full flex justify-between items-center  mb-6">
                <img src="/Icons/vector/Thinking/zarivka_thinking_modre.svg" className="size-8"
                     alt="Přemýšlející táda"/>
                <h1 className="text-xl">Vytvoření kurzu</h1>

                <button className="bg-transparent p-1" onClick={handleClose}>
                    <img className="size-5" src="/Icons/vector/X/X_cervene.svg" alt="Tlačítko k zavření"/>

                </button>
            </div>


            <div className="w-full flex justify-between mb-5">
                <label className="text-lg">Název kurzu</label>
                <input type="text" value={title} onChange={(t) => setTitle(t.target.value)}
                       className="bg-gray-200 p-1 rounded-sm"/>
            </div>

            <div className="w-full flex items-center justify-between">
                <div>
                    {result == false && <p className=" text-red-500">Kurz nebyl vytvořen</p>}
                    {result == true && <p className=" text-green-500">Kurz byl vytvořen</p>}
                </div>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={handleCreate}>Vytvořit</button>
            </div>


        </div>
    </div>;
};