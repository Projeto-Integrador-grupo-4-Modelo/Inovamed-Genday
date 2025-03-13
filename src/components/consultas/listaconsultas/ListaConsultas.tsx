import React, { useContext, useEffect, useState } from "react";
import Consulta from "../../../models/Consulta";
import { Search } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { buscar, deletar } from "../../../service/Service";
import CardConsultas from "../cardconsultas/CardConsultas";
import toast from "react-hot-toast";

export function ListaConsultas() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [consultasFiltradas, setConsultasFiltradas] = useState<Consulta[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    filtrarConsultas();
  }, [searchTerm, consultas]);

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

  // Função para remover acentos de uma string
  function removerAcentos(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function filtrarConsultas() {
    if (searchTerm.trim() === "") {
      setConsultasFiltradas(consultas);
      return;
    }

    const termLowerCase = removerAcentos(searchTerm.toLowerCase());
    const filtradas = consultas.filter((consulta) => {
      return Object.entries(consulta).some(([key, value]) => {
        if (key === "id" && typeof value === "number") {
          return value.toString().includes(termLowerCase);
        }

        if (value && typeof value === "object") {
          return Object.values(value).some(
            (nestedValue) =>
              nestedValue &&
              removerAcentos(String(nestedValue).toLowerCase()).includes(
                termLowerCase
              )
          );
        }

        return (
          value &&
          removerAcentos(String(value).toLowerCase()).includes(termLowerCase)
        );
      });
    });

    setConsultasFiltradas(filtradas);
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
      {/* Cabeçalho com título e barra de pesquisa lado a lado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#00948aff] mb-4 md:mb-0">
          Consultas Cadastradas
        </h2>

        {/* Barra de pesquisa com largura reduzida */}
        <div className="relative w-full md:w-64 lg:w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00948aff] focus:border-[#00948aff] block w-full pl-10 p-2.5"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {consultasFiltradas.length > 0 ? (
        <div className="flex flex-col-reverse gap-y-8">
          {consultasFiltradas.map((consulta) => (
            <CardConsultas
              key={consulta.id}
              consulta={consulta}
              onDelete={deletaConsulta}
              onUpdate={atualizarConsultaNaLista}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchTerm
              ? "Nenhuma consulta encontrada para esta pesquisa."
              : "Nenhuma consulta cadastrada."}
          </p>
        </div>
      )}
    </div>
  );
}
