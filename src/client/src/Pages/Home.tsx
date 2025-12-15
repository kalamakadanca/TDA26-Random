import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (url: string) => {
    navigate(url);
  };

  return (
    <div className="w-full h-full flex flex-col p-3 gap-5">
      <h1 className="text-[#91F5AD] flex justify-center text-5xl font-bold mb-5">
        Katalog kurzů
      </h1>
      <div className="flex flex-col justify-center items-center flex-1 gap-5">
        <h3 className="text-3xl">Hello TdA</h3>

        <button
          className="bg-blue-300 p-3 rounded-lg"
          onClick={() => navigateTo("/courses")}
        >
          Přejít na kurzy
        </button>
      </div>
    </div>
  );
}

export default Home;
