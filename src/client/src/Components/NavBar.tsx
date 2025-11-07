import {useNavigate, useLocation} from 'react-router-dom';
import SearchBar from "./SearchBar.tsx";
function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const navigateHome = () => {
        navigate("/");
    };

    return <div className={(location.pathname == "/login" || location.pathname == "/register") ? "hidden" : "w-full bg-blue-500 p-3 flex justify-between shadow items-center flex-1"}>
        <div onClick={navigateHome} className="cursor-pointer">
            <img className="w-64" src="/Logo/SVG/Think-different-Academy_LOGO_oficialni-bile.svg"/>
        </div>

        <div className={location.pathname == "/courses" ? "" : "hidden"}>
            && <SearchBar/>
        </div>

        <div>

        </div>
    </div>;
}

export default NavBar;
