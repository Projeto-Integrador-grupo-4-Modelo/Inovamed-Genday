import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  function Logout() {
    handleLogout();
    toast.success("O Usuário foi desconectado com sucesso!");
    navigate("/");
  }

  return (
    <div className="p-4 relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {usuario.token ? (
          <div className="text-black flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-[#0D9488]">
              Bem-vindo(a),
            </h2>
            <h2 className="text-2xl font-bold text-[#1C74c8]">
              {usuario.nome}
            </h2>
          </div>
        ) : (
          <div>
            <Link to="/login" className="text-white">
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Botão de Logout no canto inferior direito */}
      {usuario.token && (
        <div className="absolute bottom-4 right-6">
          <button
            onClick={Logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
