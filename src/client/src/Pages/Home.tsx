import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const navigateTo = (url: string) => {
        navigate(url);
    }

    return <div className="container h-full flex flex-col justify-center items-center p-3 gap-5">
            <h3 className="text-3xl">Hello TdA!</h3>

            <button className="bg-blue-300 p-3 rounded-lg" onClick={() => navigateTo("/courses")}>Přejít na kurzy</button>

    </div>
}

export default Home;