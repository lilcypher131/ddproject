export interface Carta {
  id: number
  nome: string
  dano: number
  vida: number
  defesa: number
  velocidade: number
  foto: string
  descricao?: string
}

export interface ResultadoDuelo {
  vencedor: Carta | null
  tipoVitoria: "normal" | "empate" | "desclassificacao"
  detalhes: {
    danoA: number
    danoB: number
    vidaRestanteA: number
    vidaRestanteB: number
  }
}

export interface ResultadoBatalha {
  duelos: {
    monstroJogador: Carta
    monstroInimigo: Carta
    resultado: ResultadoDuelo
  }[]
  vitoriasJogador: number
  vitoriasInimigo: number
  empates: number
  vencedorGeral: "jogador" | "inimigo" | "empate"
}
