import {useState} from "react";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const register = async () => {
        const response = await axios.post('http://localhost:5196/api/auth/register', {
            email, password
        })

        if (response.status >= 200 && response.status < 300) {
            console.log("User has been logged in")
        }
    }

    return <div className="container flex h-full items-center justify-center w-screen ">
        <form
            className="bg-gray-50 flex justify-center items-center flex-col p-5 shadow-xl rounded-xl w-1/3 h-fit border-gray-200"
            onSubmit={register}>
            <div className="mb5 w-full flex flex-col">
                <label className="text-lg pb-1">E-mail: </label>
                <input className="bg-blue-50 w-full h-10 border rounded border-gray-200 pl-2"
                       value={email} onChange={(e) => setEmail(e.target.value)} type="text"
                       placeholder="pavlik@gmail.com" autoComplete="off"/>
            </div>

            <div className="mb-5 w-full flex justify-between flex-col">
                <label className="text-lg pb-1">Heslo: </label>
                <input className="bg-blue-50 w-full h-10 border rounded border-gray-200 pl-2" value={password}
                       onChange={(p) => setPassword(p.target.value)} type="password" placeholder="******"
                       autoComplete="off"/>
            </div>

            <div className="mb-5 w-full flex justify-between flex-col">
                <label className="text-lg pb-1">Potvrďte heslo: </label>
                <input className="bg-blue-50 w-full h-10 border rounded border-gray-200 pl-2" value={confirmPassword}
                       onChange={(p) => setConfirmPassword(p.target.value)} type="password" placeholder="******"
                       autoComplete="off"/>
                <p></p>
            </div>

            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <p>Už máte účet? <a className="underline" href="/register">Přihlásit se</a></p>
                </div>
                <button className="bg-blue-500 text-white rounded p-2" type="submit">Přihlásit se</button>
            </div>
        </form>
    </div>
};