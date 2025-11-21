import {useNavigate, useLocation,} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "./SearchBar.tsx";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const navigateHome = () => {
        navigate("/");
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const me = async () => {
            const res = await axios.get('http://localhost:5196/api/auth/me');
            setIsAuthenticated(res.status === 200);
        
        };

        me();
    }, []);

    const logout = async () => {
        const res = await axios.post("http://localhost:5196/api/auth/me");

        if (res.status === 200) {
            window.location.reload();
        }
    };

    return <div
        className={(location.pathname == "/login" || location.pathname == "/register") ? "hidden" : "w-full bg-blue-500 p-3 flex justify-between shadow items-center flex-1"}>
        <div onClick={navigateHome} className="cursor-pointer">
            <img className="w-64" src="/Logo/SVG/Think-different-Academy_LOGO_oficialni-bile.svg"/>
        </div>

        <div className={location.pathname == "/courses" ? "" : "hidden"}>
            <SearchBar/>
        </div>

        <div className="">
            {isAuthenticated ?
                <button className="p-3 bg-blue-50 rounded" onClick={() => navigate("/login")}>Přihlásit se</button> :
                <div className="w-full h-full flex flex-row gap-5 justify-center items-center">
                    <button className="p-3 bg-blue-50 rounded" onClick={logout}>Odhlásit se</button>
                    <div className="bg-blue-50 p-1 rounded-full overflow-hidden cursor-pointer">
                        <img src='/user-icon.png' className=" size-10"/>

                    </div>
                </div>}
        </div>
    </div>;
}

export default NavBar;
