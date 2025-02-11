import React, { useContext, useEffect, useState } from "react";
import Consulta from "../../../models/Consulta";

import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { buscar, deletar } from "../../../service/Service";
import CardConsultas from "../cardconsultas/CardConsultas";
import toast from "react-hot-toast";

export function ListaConsultas() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      toast.error("Você precisa estar logado");
      navigate("/");
    } else {
      buscaConsultas();
    }
  }, [token]);

  async function buscaConsultas() {
    try {
      await buscar("/consultas", setConsultas, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function deletaConsulta(id: number) {
    try {
      await deletar(`/consultas/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      setConsultas((prev) => prev.filter((c) => c.id !== id));
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        toast.error("Erro ao deletar a consulta.");
      }
    }
  }

  function atualizarConsultaNaLista(consultaAtualizada: Consulta) {
    setConsultas((prevConsultas) =>
      prevConsultas.map((c) =>
        c.id === consultaAtualizada.id ? consultaAtualizada : c
      )
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-2xl font-sans text-teal-950 mb-6">
        Consultas Cadastradas
      </h2>
      <div className="space-y-6">
        {consultas.map((consulta) => (
          <CardConsultas
            key={consulta.id}
            consulta={consulta}
            onDelete={deletaConsulta}
            onUpdate={atualizarConsultaNaLista}
          />
        ))}
      </div>
    </div>
  );
}
