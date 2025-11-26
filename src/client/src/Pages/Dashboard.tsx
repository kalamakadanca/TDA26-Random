import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            try {
                await axios.get('http://localhost:5196/api/auth/me', {withCredentials: true});
            } catch (error) {
                console.error("Authentication check failed:", error);
                // TODO: Pro development jsem vypnul
                // const returnUrl = encodeURIComponent(location.pathname + location.search);
                // window.location.href = `/login?returnUrl=${returnUrl}`;
            }
        };

        check();
    }, [navigate]);

    return <div className="container h-full w-full">
        <div className="row">
            <div className="col flex mt-3 flex-col">
                <h1 className="text-3xl mb-5">Správa kurzů</h1>
                
                <ul>
                    <li>Kurz 1 </li>
                    <li>Kurz 2</li>
                    <li>Kurz 3</li>
                    <li>Kurz 4</li>
                    <li>Kurz 5</li>
                </ul>
                
                <div className="flex gap-3">
                    <button className="bg-blue-300 p-3 rounded">Vytvořit kurz</button>
                    <button className="bg-blue-300 p-3 rounded">Spravovat kurzy</button>
                </div>
            </div>
        </div>
    </div>
};