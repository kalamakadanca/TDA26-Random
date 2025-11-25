import {useEffect} from "react";
import {me} from "../Scripts/authHelper"
import {useNavigate} from "react-router-dom";
export default function Dashboard() {
    const navigate = useNavigate();
    
    
    useEffect(() => {
        me().then((isAuthenticated) => {
            if (!isAuthenticated) {
             navigate(`/login?returlUrl=${encodeURIComponent(window.location.pathname)}`)   
            }
        });
    }, []);
    
    return <div className="container h-full w-full">
        
    </div>
};