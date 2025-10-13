"use client";

import { useState, useEffect } from "react";
import type { Carta, ResultadoBatalha, ResultadoDuelo } from "@/types/carta";
import CartaMonstro from "@/components/cards/cartaMonstro";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ResultadosBatalha } from "@/components/batalha/resultadoBatalha";
import { AnimacaoDuelo } from "@/components/batalha/animacaoDuelo";
import { useMonstros } from "@/contexts/MonstrosContext";
import { callApiAsync } from "@/utils/api";

type EstadoBatalha = "preparacao" | "pareamento" | "duelo" | "resultado";

interface Pareamento {
  jogador: Carta | null;
  inimigo: Carta | null;
}

export default function PaginaBatalha() {
  const { monstros } = useMonstros();

  const router = useRouter();
  const [estadoBatalha, setEstadoBatalha] =
    useState<EstadoBatalha>("preparacao");
  const [monstrosJogador, setMonstrosJogador] = useState<Carta[]>([]);
  const [monstrosInimigo, setMonstrosInimigo] = useState<Carta[]>([]);
  const [batalhaIniciada, setBatalhaIniciada] = useState(false);
  const [pareamentos, setPareamentos] = useState<Pareamento[]>([
    { jogador: null, inimigo: null },
    { jogador: null, inimigo: null },
    { jogador: null, inimigo: null },
  ]);
  const [monstroSelecionado, setMonstroSelecionado] = useState<Carta | null>(
    null
  );
  const [resultadoBatalha, setResultadoBatalha] =
    useState<ResultadoBatalha | null>(null);
  const [dueloAtual, setDueloAtual] = useState<number>(0);
  const [resultadoDueloAtual, setResultadoDueloAtual] =
    useState<ResultadoDuelo | null>(null);

  useEffect(() => {
    if (!batalhaIniciada && monstros.length > 0) {
      iniciarBatalha(monstros);
      setBatalhaIniciada(true);
    }
  }, [monstros.length, batalhaIniciada]);

  const iniciarBatalha = async (monstros: Carta[]) => {
    setMonstrosJogador(monstros);
    console.log("Monstros do jogador:", monstros);

    await callApiAsync<Carta[]>(
      "/cartas/aleatorias?qtd=3",
      "GET",
      null,
      (data: Carta[]) => {
        console.log("Monstros inimigos carregados da API:", data);
        setMonstrosInimigo(data);
      },
      (e: unknown) => console.error("Erro ao carregar monstros inimigos:", e)
    );

    setEstadoBatalha("pareamento");
  };

  const selecionarMonstroJogador = (monstro: Carta) => {
    if (monstroSelecionado?.id === monstro.id) {
      setMonstroSelecionado(null);
    } else {
      setMonstroSelecionado(monstro);
    }
  };

  const parearComInimigo = (inimigo: Carta) => {
    if (!monstroSelecionado) return;

    // Ve se o monstro do jogador já ta pareado
    const indicePareamentoExistente = pareamentos.findIndex(
      (p) => p.jogador?.id === monstroSelecionado.id
    );

    if (indicePareamentoExistente !== -1) {
      const novosPareamentos = [...pareamentos];
      novosPareamentos[indicePareamentoExistente] = {
        jogador: null,
        inimigo: null,
      };
      setPareamentos(novosPareamentos);
    }

    const indiceSlot = pareamentos.findIndex(
      (p) =>
        p.inimigo?.id === inimigo.id ||
        (p.jogador === null && p.inimigo === null)
    );

    if (indiceSlot !== -1) {
      const novosPareamentos = [...pareamentos];
      novosPareamentos[indiceSlot] = {
        jogador: monstroSelecionado,
        inimigo: inimigo,
      };
      setPareamentos(novosPareamentos);
      setMonstroSelecionado(null);
    }
  };

  const todosPareados = () => {
    return pareamentos.every((p) => p.jogador !== null && p.inimigo !== null);
  };

  const iniciarDuelos = async () => {
    setEstadoBatalha("duelo");
    setDueloAtual(0);

    const resultados: ResultadoBatalha["duelos"] = [];

    for (let i = 0; i < pareamentos.length; i++) {
      const pareamento = pareamentos[i];
      if (pareamento.jogador && pareamento.inimigo) {
        setDueloAtual(i);

        // Simula duelo
        const resultadoDuelo = await callApiAsync<ResultadoDuelo>(
          "/cartas/duelo",
          "POST",
          {
            idCartaJogador: pareamento.jogador.id,
            idCartaInimigo: pareamento.inimigo.id,
          },
          () => {
            console.log(`Duelo ${i + 1} concluído com sucesso.`);
          },
          (e) => {
            console.error(`Falha ao realizar o duelo ${i + 1}:`, e);
          }
        );

        if (resultadoDuelo) {
          setResultadoDueloAtual(resultadoDuelo);

          resultados.push({
            monstroJogador: pareamento.jogador,
            monstroInimigo: pareamento.inimigo,
            resultado: resultadoDuelo,
          });

          await new Promise((resolve) => setTimeout(resolve, 3000));
          setResultadoDueloAtual(null);
        }
      }
    }

    // Calcula resultado final
    const vitoriasJogador = resultados.filter(
      (r) => r.resultado.vencedor?.id === r.monstroJogador.id
    ).length;
    const vitoriasInimigo = resultados.filter(
      (r) => r.resultado.vencedor?.id === r.monstroInimigo.id
    ).length;
    const empates = resultados.filter(
      (r) => r.resultado.vencedor === null
    ).length;

    const vencedorGeral: ResultadoBatalha["vencedorGeral"] =
      vitoriasJogador > vitoriasInimigo
        ? "jogador"
        : vitoriasInimigo > vitoriasJogador
        ? "inimigo"
        : "empate";

    setResultadoBatalha({
      duelos: resultados,
      vitoriasJogador,
      vitoriasInimigo,
      empates,
      vencedorGeral,
    });

    setEstadoBatalha("resultado");
  };

  const jogarNovamente = () => {
    setPareamentos([
      { jogador: null, inimigo: null },
      { jogador: null, inimigo: null },
      { jogador: null, inimigo: null },
    ]);
    setMonstroSelecionado(null);
    setResultadoBatalha(null);
    setDueloAtual(0);
    setResultadoDueloAtual(null);
    iniciarBatalha(monstros);
  };

  const voltarHome = () => {
    router.push("/");
  };

  if (estadoBatalha === "preparacao") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8]">
        <div className="text-center">
          <i className="fa-solid fa-swords fa-spin text-6xl text-amber-900 mb-4"></i>
          <p className="text-2xl font-bold text-amber-900">
            Preparando batalha...
          </p>
        </div>
      </div>
    );
  }

  if (estadoBatalha === "duelo" && resultadoDueloAtual) {
    const pareamentoAtual = pareamentos[dueloAtual];
    return (
      <AnimacaoDuelo
        monstroJogador={pareamentoAtual.jogador!}
        monstroInimigo={pareamentoAtual.inimigo!}
        resultado={resultadoDueloAtual}
        numeroDuelo={dueloAtual + 1}
      />
    );
  }

  if (estadoBatalha === "resultado" && resultadoBatalha) {
    return (
      <ResultadosBatalha
        resultado={resultadoBatalha}
        aoJogarNovamente={jogarNovamente}
        aoVoltarHome={voltarHome}
      />
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8]">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2">
            <i className="fa-solid fa-swords mr-3"></i>
            Arena de Batalha
          </h1>
          <p className="text-amber-700">
            {monstroSelecionado
              ? "Clique em um inimigo para parear"
              : "Selecione um de seus monstros"}
          </p>
        </div>

        {/* Área de Inimigos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-red-800 mb-12 flex items-center gap-2">
            <i className="fa-solid fa-skull"></i>
            Inimigos
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {monstrosInimigo.map((inimigo, index) => {
              const pareado = pareamentos.some(
                (p) => p.inimigo?.id === inimigo.id
              );
              return (
                <div key={inimigo.id} className="relative">
                  <CartaMonstro
                    monstro={inimigo}
                    indiceOnda={index}
                    selecionado={pareado}
                    desabilitado={!monstroSelecionado}
                    aoClicar={() => parearComInimigo(inimigo)}
                    mostrarDetalhesAoClicar={false}
                  />
                  {pareado && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      Pareado
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pareamentos */}
        <div className="mb-12 bg-white/50 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
            Pareamentos
          </h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {pareamentos.map((pareamento, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-20 h-24 border-2 border-dashed border-amber-600 rounded-lg flex items-center justify-center bg-amber-50">
                  {pareamento.jogador ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pareamento.jogador.foto || "/placeholder.svg"}
                      alt={pareamento.jogador.nome}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <span className="text-amber-400 text-3xl">?</span>
                  )}
                </div>
                <i className="fa-solid fa-swords text-2xl text-amber-700"></i>
                <div className="w-20 h-24 border-2 border-dashed border-red-600 rounded-lg flex items-center justify-center bg-red-50">
                  {pareamento.inimigo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pareamento.inimigo.foto || "/placeholder.svg"}
                      alt={pareamento.inimigo.nome}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <span className="text-red-400 text-3xl">?</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área do Jogador */}
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-12 flex items-center gap-2">
            <i className="fa-solid fa-shield"></i>
            Seus Monstros
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {monstrosJogador.map((monstro, index) => {
              const pareado = pareamentos.some(
                (p) => p.jogador?.id === monstro.id
              );
              return (
                <div key={monstro.id} className="relative">
                  <CartaMonstro
                    monstro={monstro}
                    indiceOnda={index}
                    selecionado={
                      monstroSelecionado?.id === monstro.id || pareado
                    }
                    aoClicar={() => selecionarMonstroJogador(monstro)}
                    mostrarDetalhesAoClicar={false}
                  />
                  {pareado && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      Pareado
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-center gap-4 mt-12">
          <Button
            onClick={voltarHome}
            variant="outline"
            className="px-8 py-6 text-lg bg-transparent"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Voltar
          </Button>
          <Button
            onClick={iniciarDuelos}
            disabled={!todosPareados()}
            className="px-8 py-6 text-lg bg-red-600 hover:bg-red-700"
          >
            <i className="fa-solid fa-swords mr-2"></i>
            Iniciar Duelos
          </Button>
        </div>
      </div>
    </main>
  );
}
