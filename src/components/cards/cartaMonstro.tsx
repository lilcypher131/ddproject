"use client"

import type { Monstro } from "@/types/monstro"
import { obterCorRaridade } from "@/lib/apiSimulada"
import { useState } from "react"
import { DetalhesMonstro } from "@/components/modals/detalhesMonstro"

interface PropriedadesCartaMonstro {
  monstro: Monstro
  indiceOnda?: number
  alturasPulo?: string
  aoClicar?: () => void
  selecionado?: boolean
  desabilitado?: boolean
  mostrarDetalhesAoClicar?: boolean
}

export default function CartaMonstro({
  monstro,
  indiceOnda = 0,
  alturasPulo = "2px",
  aoClicar,
  selecionado = false,
  desabilitado = false,
  mostrarDetalhesAoClicar = true,
}: PropriedadesCartaMonstro) {
  const [modalAberto, setModalAberto] = useState(false)

  const handleClick = () => {
    if (desabilitado) return

    if (mostrarDetalhesAoClicar) {
      setModalAberto(true)
    }

    if (aoClicar) {
      aoClicar()
    }
  }

  return (
    <>
      <div
        className={`
          h-32 w-24 md:h-36 md:w-28 -translate-y-4 
          flex flex-col items-center justify-between gap-1 
          border-2 rounded-lg 
          ${selecionado ? "border-green-500 border-4" : "border-amber-900"}
          bg-gradient-to-b from-amber-100 to-amber-200 
          p-2 shadow-xl 
          transition-all duration-200
          ${desabilitado ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl cursor-pointer"}
          ${selecionado ? "scale-105 shadow-2xl" : ""}
          animate-pulo-onda
        `}
        style={{
          // @ts-ignore - CSS custom properties
          "--altura-pulo": alturasPulo,
          animationDelay: `${indiceOnda * 120}ms`,
        }}
        onClick={handleClick}
      >
        {/* Badge de raridade */}
        <div
          className={`absolute -top-2 -right-2 ${obterCorRaridade(monstro.raridade)} text-white text-xs px-2 py-1 rounded-full font-bold shadow-md`}
        >
          {monstro.raridade.charAt(0).toUpperCase()}
        </div>

        <p className="text-xs md:text-sm font-bold text-amber-900 text-center line-clamp-2">{monstro.nome}</p>

        <div className="flex-1 flex items-center justify-center w-full">
          <img
            src={monstro.imgUrl || "/placeholder.svg"}
            className="rounded-md max-h-16 md:max-h-20 w-auto object-contain"
            alt={`Imagem do ${monstro.nome}`}
          />
        </div>

        {/* Barra de força */}
        <div className="w-full bg-amber-300 rounded-full h-1.5">
          <div
            className="bg-red-600 h-1.5 rounded-full transition-all"
            style={{ width: `${Math.min(100, (monstro.forca / 30) * 100)}%` }}
          />
        </div>
      </div>

      {mostrarDetalhesAoClicar && (
        <DetalhesMonstro monstro={monstro} aberto={modalAberto} aoFechar={() => setModalAberto(false)} />
      )}
    </>
  )
}
