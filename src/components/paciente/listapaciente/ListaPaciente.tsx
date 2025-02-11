import React, { useContext, useEffect, useState } from "react";
import Cliente from "../../../models/Cliente";
import { CardPaciente } from "../cardpaciente/CardPaciente";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { buscar, deletar } from "../../../service/Service";
import toast from "react-hot-toast";

export function ListaPaciente() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Cliente[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      toast.error("Você precisa estar logado");
      navigate("/");
    } else {
      buscaPacientes();
    }
  }, [token]);

  async function buscaPacientes() {
    try {
      await buscar("/clientes", setPacientes, {
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

  async function deletaPaciente(id: number) {
    try {
      await deletar(`/clientes/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      setPacientes((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        toast.error("Erro ao deletar o paciente.");
      }
    }
  }

  function atualizarPacienteNaLista(pacienteAtualizado: Cliente) {
    setPacientes((prevPacientes) =>
      prevPacientes.map((p) =>
        p.id === pacienteAtualizado.id ? pacienteAtualizado : p
      )
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-2xl font-sans text-teal-950 mb-6">
        Pacientes Cadastrados
      </h2>
      <div className="space-y-6">
        {pacientes.map((paciente) => (
          <CardPaciente
            key={paciente.id}
            paciente={paciente}
            onDelete={deletaPaciente}
            onUpdate={atualizarPacienteNaLista}
          />
        ))}
      </div>
    </div>
  );
}
