import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {me} from "../Scripts/authHelper.ts";
import LoadingSpinner from "../Components/LoadingSpinner.tsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const handleLogin = async () => {
        setIsLoading(true);
        const response = await axios.post('http://localhost:5196/api/auth/login', { // URI se pak musí změnit
            email, password,
        }, {
            withCredentials: true
        })

        if (response.status >= 200 && response.status < 300) {
            const returnUrl = searchParams.get('returnUrl') || '/';
            window.location.href = returnUrl;
        }

        setIsLoading(false);
    }

    useEffect(() => {
        const check = async () => {
            if (await me()) {
                window.location.href = "/"
            }
        }
        
        check()
    }, []);

    return <div className="container flex h-full items-center justify-center">
        {isLoading && <LoadingSpinner/>}
        <div
            className="bg-gray-50 flex justify-center items-center flex-col p-5 shadow-xl rounded-xl w-1/3 h-fit border-gray-200"
        >
            <div className="mb5 w-full flex flex-col">
                <label className="text-lg pb-1">E-mail: </label>
                <input className="bg-blue-50 w-full h-10 border rounded border-gray-200 pl-2"
                       value={email} onChange={(e) => setEmail(e.target.value)} type="text"
                       placeholder="pavlik@gmail.com"/>
            </div>

            <div className="mb-5 w-full flex justify-between flex-col">
                <label className="text-lg pb-1">Heslo: </label>
                <input className="bg-blue-50 w-full h-10 border rounded border-gray-200 pl-2" value={password}
                       onChange={(p) => setPassword(p.target.value)} type="password" placeholder="******"/>
            </div>

            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <p>Ještě nemáte účet? <a className="underline" href="/register">Vytvořit účet</a></p>
                </div>
                <button className="bg-blue-500 text-white rounded p-2" onClick={handleLogin}>Přihlásit se</button>
            </div>
        </div>
    </div>;
};