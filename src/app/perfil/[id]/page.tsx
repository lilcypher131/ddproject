"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import CartaMonstro from "@/components/cards/cartaMonstro";
import { Button } from "@/components/ui/button";
import { buscarCartasUsuario } from "@/utils/apiCartas";
import type { Carta } from "@/types/carta";

export default function PaginaPerfil() {
  const params = useParams();
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [erro, setErro] = useState<string>("");

  const idUsuario = params?.id ? Number(params.id) : null;

  useEffect(() => {
    const carregarDadosPerfil = async () => {
      if (!idUsuario || !token || !isAuthenticated) {
        setErro("Você precisa estar autenticado para ver o perfil");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErro("");

        // Buscar cartas do usuário
        const cartasUsuario = await buscarCartasUsuario(idUsuario);
        setCartas(cartasUsuario);

        if (user && user.id === idUsuario) {
          setNomeUsuario(user.nome);
        } else {
          setNomeUsuario(`Usuário #${idUsuario}`);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setErro("Erro ao carregar as cartas do usuário");
      } finally {
        setLoading(false);
      }
    };

    carregarDadosPerfil();
  }, [idUsuario, token, isAuthenticated, user]);

  const voltarHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8]">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-6xl text-amber-900 mb-4"></i>
          <p className="text-2xl font-bold text-amber-900">
            Carregando perfil...
          </p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8]">
        <div className="text-center max-w-md mx-auto p-6">
          <i className="fa-solid fa-exclamation-triangle text-6xl text-red-600 mb-4"></i>
          <p className="text-2xl font-bold text-amber-900 mb-4">{erro}</p>
          <Button onClick={voltarHome} className="mt-4">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Voltar para Home
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8]">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-amber-900 mb-2 drop-shadow-lg"
            style={{ fontFamily: "serif" }}
          >
            <i className="fa-solid fa-user-shield mr-3"></i>
            Perfil de {nomeUsuario}
          </h1>
          <p className="text-amber-700 text-lg font-semibold">
            Minha Coleção de Monstros
          </p>
          {cartas.length > 0 && (
            <p className="text-amber-600 text-sm mt-2">
              Total: {cartas.length} {cartas.length === 1 ? "carta" : "cartas"}
            </p>
          )}
        </div>

        {/* Grid de Cartas */}
        {cartas.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center mb-8">
            {cartas.map((carta, index) => (
              <div key={`${carta.id}-${index}`} className="flex justify-center">
                <CartaMonstro
                  monstro={carta}
                  indiceOnda={index}
                  alturasPulo="2px"
                  mostrarDetalhesAoClicar={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fa-solid fa-box-open text-6xl text-amber-400 mb-4"></i>
            <p className="text-xl font-bold text-amber-700">
              Nenhuma carta encontrada
            </p>
            <p className="text-amber-600 mt-2">
              Este usuário ainda não possui cartas em sua coleção.
            </p>
          </div>
        )}

        {/* Botão Voltar */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={voltarHome}
            className="px-8 py-6 text-lg bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Voltar para Home
          </Button>
        </div>
      </div>
    </main>
  );
}