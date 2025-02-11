import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="p-4">
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
    </div>
  );
}

export default Navbar;
