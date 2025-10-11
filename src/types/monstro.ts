export type Raridade = "comum" | "raro" | "epico" | "lendario"

export interface Monstro {
  id: string
  nome: string
  forca: number
  dano: number
  vida: number
  defesa: number
  velocidade: number
  raridade: Raridade
  habilidades: string[]
  imgUrl: string
  descricao?: string
}

export interface ResultadoDuelo {
  vencedor: Monstro | null
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
    monstroJogador: Monstro
    monstroInimigo: Monstro
    resultado: ResultadoDuelo
  }[]
  vitoriasJogador: number
  vitoriasInimigo: number
  empates: number
  vencedorGeral: "jogador" | "inimigo" | "empate"
}
