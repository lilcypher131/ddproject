"use client"

import type { Monstro, ResultadoDuelo } from "@/types/monstro"
import { useEffect, useState } from "react"

interface PropriedadesAnimacaoDuelo {
  monstroJogador: Monstro
  monstroInimigo: Monstro
  resultado: ResultadoDuelo
  numeroDuelo: number
}

export function AnimacaoDuelo({ monstroJogador, monstroInimigo, resultado, numeroDuelo }: PropriedadesAnimacaoDuelo) {
  const [fase, setFase] = useState<"preparacao" | "combate" | "resultado">("preparacao")

  useEffect(() => {
    const timer1 = setTimeout(() => setFase("combate"), 500)
    const timer2 = setTimeout(() => setFase("resultado"), 1500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8] p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-2">Duelo {numeroDuelo} de 3</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-2 w-20 bg-amber-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 transition-all duration-500"
              style={{ width: `${(numeroDuelo / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-12 mb-8">
        {/* Monstro do Jogador */}
        <div className={`text-center transition-all duration-500 ${fase === "combate" ? "animate-pulse" : ""}`}>
          <div className="relative">
            <img
              src={monstroJogador.imgUrl || "/placeholder.svg"}
              alt={monstroJogador.nome}
              className="w-48 h-48 object-contain"
            />
            {fase === "combate" && (
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-4xl animate-bounce">⚔️</div>
            )}
          </div>
          <h3 className="text-xl font-bold text-green-800 mt-2">{monstroJogador.nome}</h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-amber-700">Vida: {monstroJogador.vida}</p>
            {fase === "resultado" && <p className="text-lg font-bold text-red-600">-{resultado.detalhes.danoB} HP</p>}
          </div>
        </div>

        <div className="text-6xl font-bold text-amber-900">VS</div>

        {/* Monstro Inimigo */}
        <div className={`text-center transition-all duration-500 ${fase === "combate" ? "animate-pulse" : ""}`}>
          <div className="relative">
            <img
              src={monstroInimigo.imgUrl || "/placeholder.svg"}
              alt={monstroInimigo.nome}
              className="w-48 h-48 object-contain"
            />
            {fase === "combate" && (
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-4xl animate-bounce">⚔️</div>
            )}
          </div>
          <h3 className="text-xl font-bold text-red-800 mt-2">{monstroInimigo.nome}</h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-amber-700">Vida: {monstroInimigo.vida}</p>
            {fase === "resultado" && <p className="text-lg font-bold text-red-600">-{resultado.detalhes.danoA} HP</p>}
          </div>
        </div>
      </div>

      {/* Resultado */}
      {fase === "resultado" && (
        <div className="text-center animate-slideUp">
          {resultado.vencedor ? (
            <div
              className={`text-3xl font-bold ${
                resultado.vencedor.id === monstroJogador.id ? "text-green-700" : "text-red-700"
              }`}
            >
              <i className="fa-solid fa-trophy mr-2"></i>
              {resultado.vencedor.nome} Venceu!
            </div>
          ) : (
            <div className="text-3xl font-bold text-amber-700">
              <i className="fa-solid fa-handshake mr-2"></i>
              Empate!
            </div>
          )}
        </div>
      )}
    </div>
  )
}
