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
            const result = await axios.get('http://localhost:5196/api/auth/me');

            if (result.status == 200) {
                setIsAuthenticated(true);
                return;
            }

            setIsAuthenticated(false);
        };
    }, []);

    const logout = async () => {

    };

    return <div
        className={(location.pathname == "/login" || location.pathname == "/register") ? "hidden" : "w-full bg-blue-500 p-3 flex justify-between shadow items-center flex-1"}>
        <div onClick={navigateHome} className="cursor-pointer">
            <img className="w-64" src="/Logo/SVG/Think-different-Academy_LOGO_oficialni-bile.svg"/>
        </div>

        <div className={location.pathname == "/courses" ? "" : "hidden"}>
            <SearchBar/>
        </div>

        <div>

            {isAuthenticated ? <button className="p-3 bg-blue-50 rounded" onClick={() => navigate("/login")}>Přihlásit se</button> : <button className="p-3 bg-blue-50 rounded ">Odhlásit se</button>}
        </div>
    </div>;
}

export default NavBar;
