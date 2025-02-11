import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Carrossel from "./Carrossel";

function Home() {
  const navigate = useNavigate();

  const handleAcessarSistema = () => {
    navigate("/login");
  };
  const handleAcessarAbout = () => {
    navigate("/about");
  };

  return (
    <>
      <div className="min-h-screen ">
        <nav className="bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow cursor-pointer">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            {" "}
            {/* Removido o max-w-7xl e mx-auto */}
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-start space-x-2">
                <span className="text-3xl font-bold text-teal-600">
                  Inova Med
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAcessarAbout}
                  className="text-teal-600 px-4 py-2 rounded-lg hover:text-teal-800 transition-colors transform hover:scale-105 hover:shadow-md"
                >
                  <span>Sobre</span>
                </button>
                <button
                  onClick={handleAcessarSistema}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
                >
                  <span>Acessar Sistema</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <Carrossel />
      </div>
    </>
  );
}

export default Home;
