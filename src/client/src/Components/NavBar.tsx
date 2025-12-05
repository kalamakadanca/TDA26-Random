import {useNavigate, useLocation,} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "./SearchBar.tsx";
import {me} from "../Scripts/authHelper.ts"
import AccountDropdown from "./AccountDropdown.tsx";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const navigateHome = () => {
        navigate("/");
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

    useEffect(() => {
        const check = async () => {
            setIsAuthenticated(await me())
        };

        check();
    }, []);

    const logout = async () => {
        const res = await axios.post("http://localhost:5196/api/auth/logout");

        if (res.status === 200) {
            window.location.reload();
        }
    };

    return <div
        className={(location.pathname == "/login" || location.pathname == "/register") ? "hidden" : "w-full bg-blue-500 p-3 flex justify-between shadow items-center flex-1"}>
        <div onClick={navigateHome} className="cursor-pointer">
            <img className="w-64" src="/Logo/SVG/Think-different-Academy_LOGO_oficialni-bile.svg"
                 alt="Logo Tour de App"/>
        </div>

        <div className={location.pathname == "/courses" ? "" : "hidden"}>
            <SearchBar/>
        </div>

        <div className="">
            {isAuthenticated ?
                <div className="w-full h-full flex flex-row gap-5 justify-center items-center">
                    <div className="relative"
                         onMouseEnter={() => setShowUserMenu(true)}
                         onMouseLeave={() => setShowUserMenu(false)}>
                        <div className="bg-blue-50 p-1 relative rounded-full cursor-pointer">
                            <img src='/user-icon.png' className=" size-10" alt="Ikona uživatele"/>

                        </div>
                        {showUserMenu && <AccountDropdown onLogout={logout}/>}
                    </div>
                </div>
                :
                <button className="p-3 bg-blue-50 rounded" onClick={() => navigate("/login")}>Přihlásit se</button>
            }
        </div>
    </div>;
}

export default NavBar;
