"use client"

import type { Monstro } from "@/types/monstro"
import { obterCorRaridade } from "@/lib/apiSimulada"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PropriedadesDetalhesMonstro {
  monstro: Monstro
  aberto: boolean
  aoFechar: () => void
}

export function DetalhesMonstro({ monstro, aberto, aoFechar }: PropriedadesDetalhesMonstro) {
  return (
    <Dialog open={aberto} onOpenChange={aoFechar}>
      <DialogContent className="max-w-md w-[95vw] max-h-[90vh] bg-gradient-to-b from-amber-50 to-amber-100 border-4 border-amber-900 flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-900 flex items-center gap-2">
            {monstro.nome}
            <span className={`${obterCorRaridade(monstro.raridade)} text-white text-xs px-3 py-1 rounded-full`}>
              {monstro.raridade.toUpperCase()}
            </span>
          </DialogTitle>
          {monstro.descricao && (
            <DialogDescription className="text-amber-800 italic">{monstro.descricao}</DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto pr-2">
          {/* Imagem */}
          <div className="flex justify-center p-4 bg-white rounded-lg shadow-inner">
            <img
              src={monstro.imgUrl || "/placeholder.svg"}
              alt={`Imagem do ${monstro.nome}`}
              className="max-h-48 w-auto object-contain"
            />
          </div>

          {/* Atributos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AtributoMonstro label="Força" valor={monstro.forca} cor="text-red-700" />
            <AtributoMonstro label="Dano" valor={monstro.dano} cor="text-orange-700" />
            <AtributoMonstro label="Vida" valor={monstro.vida} cor="text-green-700" />
            <AtributoMonstro label="Defesa" valor={monstro.defesa} cor="text-blue-700" />
            <AtributoMonstro label="Velocidade" valor={monstro.velocidade} cor="text-purple-700" />
          </div>

          {/* Habilidades */}
          {monstro.habilidades && monstro.habilidades.length > 0 && (
            <div className="bg-white rounded-lg p-3 shadow-inner">
              <h3 className="font-bold text-amber-900 mb-2">Habilidades:</h3>
              <ul className="space-y-1">
                {monstro.habilidades.map((habilidade, index) => (
                  <li key={index} className="text-sm text-amber-800 flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    {habilidade}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AtributoMonstro({ label, valor, cor }: { label: string; valor: number; cor: string }) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <p className="text-xs text-amber-700 font-semibold">{label}</p>
      <p className={`text-2xl font-bold ${cor}`}>{valor}</p>
    </div>
  )
}