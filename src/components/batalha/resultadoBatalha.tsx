"use client"

import type { ResultadoBatalha } from "@/types/carta"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext";

interface PropriedadesResultadosBatalha {
  resultado: ResultadoBatalha
  aoJogarNovamente: () => void
  aoVoltarHome: () => void
}

export function ResultadosBatalha({ resultado, aoJogarNovamente, aoVoltarHome }: PropriedadesResultadosBatalha) {
  const [mostrarConfete, setMostrarConfete] = useState(false)
  const vitoria = resultado.vencedorGeral === "jogador"
  const { user, isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (vitoria) {
      setMostrarConfete(true)
      const timer = setTimeout(() => setMostrarConfete(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [vitoria])

  const moedasGanhas = vitoria ? resultado.vitoriasJogador * 50 : 10
  const experienciaGanha = resultado.vitoriasJogador * 25

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8] p-6 relative overflow-hidden">
      {/* Confete */}
      {mostrarConfete && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {["🎉", "⭐", "🏆", "✨"][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl w-full bg-white/80 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        {/* Cabeçalho de Resultado */}
        <div className="text-center mb-8">
          {vitoria ? (
            <>
              <div className="text-6xl mb-4 animate-bounce">🏆</div>
              <h1 className="text-5xl font-bold text-green-700 mb-2">VITÓRIA!</h1>
              <p className="text-xl text-amber-800">
                  {isAuthenticated && user 
                    ? `Parabéns, ${user.nome}! Você dominou a arena de batalha!`
                    : "Você dominou a arena de batalha!"}
              </p>
            </>
          ) : resultado.vencedorGeral === "empate" ? (
            <>
              <div className="text-6xl mb-4">🤝</div>
              <h1 className="text-5xl font-bold text-amber-700 mb-2">EMPATE!</h1>
              <p className="text-xl text-amber-800">Uma batalha equilibrada!</p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">💀</div>
              <h1 className="text-5xl font-bold text-red-700 mb-2">DERROTA</h1>
              <p className="text-xl text-amber-800">
                  {isAuthenticated && user
                    ? `Poxa, ${user.nome}! Você perdeu, vamos tentar novamente?`
                    : "Treine mais e tente novamente!"}
              </p>
            </>
          )}
        </div>

        {/* Placar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-100 rounded-lg p-4 text-center border-2 border-green-500 flex flex-col justify-between">
            <p className="text-sm text-green-700 font-semibold">Suas Vitórias</p>
            <p className="text-4xl font-bold text-green-800">{resultado.vitoriasJogador}</p>
          </div>
          <div className="bg-amber-100 rounded-lg p-4 text-center border-2 border-amber-500 flex flex-col justify-between">
            <p className="text-sm text-amber-700 font-semibold">Empates</p>
            <p className="text-4xl font-bold text-amber-800">{resultado.empates}</p>
          </div>
          <div className="bg-red-100 rounded-lg p-4 text-center border-2 border-red-500 flex flex-col justify-between">
            <p className="text-sm text-red-700 font-semibold">Vitórias Inimigas</p>
            <p className="text-4xl font-bold text-red-800">{resultado.vitoriasInimigo}</p>
          </div>
        </div>

        {/* Recompensas */}
        <div className="bg-gradient-to-r from-amber-200 to-yellow-200 rounded-lg p-6 mb-8 border-2 border-amber-500">
          <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">
            <i className="fa-solid fa-gift mr-2"></i>
            Recompensas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 text-center flex flex-col justify-around">
              <i className="fa-solid fa-coins text-3xl text-yellow-600 mb-2"></i>
              <p className="text-sm text-amber-700">Moedas de Ouro</p>
              <p className="text-3xl font-bold text-yellow-700">+{moedasGanhas}</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center flex flex-col justify-around">
              <i className="fa-solid fa-star text-3xl text-purple-600 mb-2"></i>
              <p className="text-sm text-amber-700">Experiência</p>
              <p className="text-3xl font-bold text-purple-700">+{experienciaGanha}</p>
            </div>
          </div>
        </div>

        {/* Detalhes dos Duelos */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-amber-900 mb-4">Resumo dos Duelos:</h3>
          <div className="space-y-3">
            {resultado.duelos.map((duelo, index) => (
              <div key={index} className="bg-amber-50 rounded-lg p-4 flex items-center justify-between gap-4 border border-amber-200">
                <div className="flex flex-col max-w-[120px] w-full sm:flex-row items-center justify-around gap-3">
                  <img
                    src={duelo.monstroJogador.foto || "/placeholder.svg"}
                    alt={duelo.monstroJogador.nome}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="font-semibold text-green-800">{duelo.monstroJogador.nome}</span>
                </div>
                <div className="text-center">
                  {duelo.resultado.vencedor ? (
                    duelo.resultado.vencedor.id === duelo.monstroJogador.id ? (
                      <span className="text-green-700 font-bold">VENCEU</span>
                    ) : (
                      <span className="text-red-700 font-bold">PERDEU</span>
                    )
                  ) : (
                    <span className="text-amber-700 font-bold">EMPATE</span>
                  )}
                </div>
                <div className="flex flex-col-reverse max-w-[120px] w-full sm:flex-row items-center justify-around gap-3">
                  <span className="font-semibold text-red-800">{duelo.monstroInimigo.nome}</span>
                  <img
                    src={duelo.monstroInimigo.foto || "/placeholder.svg"}
                    alt={duelo.monstroInimigo.nome}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={aoVoltarHome} variant="outline" className="px-8 py-6 text-lg bg-transparent">
            <i className="fa-solid fa-home mr-2"></i>
            Voltar ao Início
          </Button>
          <Button onClick={aoJogarNovamente} className="px-8 py-6 text-lg bg-green-600 hover:bg-green-700">
            <i className="fa-solid fa-rotate-right mr-2"></i>
            Jogar Novamente
          </Button>
        </div>
      </div>
    </div>
  )
}
