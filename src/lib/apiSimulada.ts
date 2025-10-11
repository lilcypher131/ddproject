import type { Monstro, ResultadoDuelo, Raridade } from "@/types/monstro"

// Banco de dados simulado de monstros
const MONSTROS_DISPONIVEIS: Omit<Monstro, "id">[] = [
  {
    nome: "Aboleth",
    forca: 21,
    dano: 18,
    vida: 135,
    defesa: 17,
    velocidade: 10,
    raridade: "epico",
    habilidades: ["Escravização Telepática", "Tentáculos Venenosos"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/aboleth.png",
    descricao: "Criatura aquática ancestral com poderes psíquicos",
  },
  {
    nome: "Dragão Negro Adulto",
    forca: 23,
    dano: 22,
    vida: 195,
    defesa: 19,
    velocidade: 14,
    raridade: "lendario",
    habilidades: ["Sopro Ácido", "Presença Aterrorizante", "Voo"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/adult-black-dragon.png",
    descricao: "Dragão cruel que habita pântanos sombrios",
  },
  {
    nome: "Acólito",
    forca: 10,
    dano: 8,
    vida: 9,
    defesa: 10,
    velocidade: 9,
    raridade: "comum",
    habilidades: ["Cura Menor", "Benção"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/acolyte.png",
    descricao: "Seguidor devoto de uma divindade",
  },
  {
    nome: "Anjo",
    forca: 18,
    dano: 16,
    vida: 136,
    defesa: 17,
    velocidade: 12,
    raridade: "epico",
    habilidades: ["Cura Divina", "Espada Flamejante", "Voo"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/deva.png",
    descricao: "Mensageiro celestial de grande poder",
  },
  {
    nome: "Balor",
    forca: 26,
    dano: 24,
    vida: 262,
    defesa: 19,
    velocidade: 13,
    raridade: "lendario",
    habilidades: ["Chicote de Fogo", "Espada Flamejante", "Aura de Fogo"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/balor.png",
    descricao: "Demônio supremo envolto em chamas",
  },
  {
    nome: "Beholder",
    forca: 10,
    dano: 20,
    vida: 180,
    defesa: 18,
    velocidade: 8,
    raridade: "lendario",
    habilidades: ["Raios Oculares", "Campo Anti-Magia", "Levitação"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/beholder.png",
    descricao: "Aberração com olho central e tentáculos oculares",
  },
  {
    nome: "Goblin",
    forca: 8,
    dano: 7,
    vida: 7,
    defesa: 15,
    velocidade: 10,
    raridade: "comum",
    habilidades: ["Furtividade", "Ataque Rápido"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/goblin.png",
    descricao: "Pequena criatura astuta e covarde",
  },
  {
    nome: "Kobold",
    forca: 7,
    dano: 5,
    vida: 5,
    defesa: 12,
    velocidade: 10,
    raridade: "comum",
    habilidades: ["Tática de Matilha", "Sensibilidade Solar"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/kobold.png",
    descricao: "Réptil humanoide covarde mas astuto",
  },
  {
    nome: "Lich",
    forca: 11,
    dano: 19,
    vida: 135,
    defesa: 17,
    velocidade: 9,
    raridade: "lendario",
    habilidades: ["Magia Arcana", "Toque Paralisante", "Imortalidade"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/lich.png",
    descricao: "Mago morto-vivo de imenso poder",
  },
  {
    nome: "Orc",
    forca: 16,
    dano: 12,
    vida: 15,
    defesa: 13,
    velocidade: 10,
    raridade: "comum",
    habilidades: ["Agressividade", "Resistência"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/orc.png",
    descricao: "Guerreiro brutal e selvagem",
  },
  {
    nome: "Tarrasque",
    forca: 30,
    dano: 28,
    vida: 676,
    defesa: 25,
    velocidade: 13,
    raridade: "lendario",
    habilidades: ["Mordida Devastadora", "Cauda Destruidora", "Reflexão de Magia"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/tarrasque.png",
    descricao: "A criatura mais poderosa e destrutiva",
  },
  {
    nome: "Troll",
    forca: 18,
    dano: 13,
    vida: 84,
    defesa: 15,
    velocidade: 10,
    raridade: "raro",
    habilidades: ["Regeneração", "Garras Afiadas"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/troll.png",
    descricao: "Criatura regenerativa de grande força",
  },
  {
    nome: "Vampiro",
    forca: 18,
    dano: 16,
    vida: 144,
    defesa: 16,
    velocidade: 12,
    raridade: "epico",
    habilidades: ["Mordida Vampírica", "Forma de Morcego", "Charme"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/vampire-vampire.png",
    descricao: "Morto-vivo sedento por sangue",
  },
  {
    nome: "Zumbi",
    forca: 13,
    dano: 8,
    vida: 22,
    defesa: 8,
    velocidade: 6,
    raridade: "comum",
    habilidades: ["Resistência a Necrose", "Mordida Infecciosa"],
    imgUrl: "https://www.dnd5eapi.co/api/images/monsters/zombie.png",
    descricao: "Cadáver reanimado por magia negra",
  },
]

// Gera ID único
function gerarId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Converte monstro base em monstro completo com ID
function criarMonstro(monstroBase: Omit<Monstro, "id">): Monstro {
  return {
    ...monstroBase,
    id: gerarId(),
  }
}

// Gera monstros aleatórios
export function gerarMonstrosAleatorios(quantidade: number): Monstro[] {
  const monstros: Monstro[] = []
  const copiaDisponiveis = [...MONSTROS_DISPONIVEIS]

  for (let i = 0; i < quantidade && copiaDisponiveis.length > 0; i++) {
    const indiceAleatorio = Math.floor(Math.random() * copiaDisponiveis.length)
    const monstroBase = copiaDisponiveis.splice(indiceAleatorio, 1)[0]
    monstros.push(criarMonstro(monstroBase))
  }

  return monstros
}

// Gera inimigos para batalha
export function gerarInimigos(quantidade = 3): Monstro[] {
  return gerarMonstrosAleatorios(quantidade)
}

// Gera deck do jogador
export function gerarDeckJogador(quantidade = 3): Monstro[] {
  return gerarMonstrosAleatorios(quantidade)
}

// Calcula poder de combate de um monstro
function calcularPoderCombate(monstro: Monstro): number {
  return monstro.forca * 1.2 + monstro.dano * 1.5 + monstro.vida * 0.3 + monstro.velocidade * 0.8 - monstro.defesa * 0.5
}

// Simula duelo entre dois monstros
export function duelar(monstroA: Monstro, monstroB: Monstro): ResultadoDuelo {
  const danoA = Math.max(1, monstroA.dano + monstroA.forca - monstroB.defesa)
  const danoB = Math.max(1, monstroB.dano + monstroB.forca - monstroA.defesa)

  // vida restante após o combate
  const vidaRestanteA = monstroA.vida - danoB
  const vidaRestanteB = monstroB.vida - danoA

  // vencedor
  let vencedor: Monstro | null = null
  let tipoVitoria: "normal" | "empate" | "desclassificacao" = "normal"

  if (vidaRestanteA > vidaRestanteB) {
    vencedor = monstroA
  } else if (vidaRestanteB > vidaRestanteA) {
    vencedor = monstroB
  } else {
    // Empate em vida, usa velocidade como desempate
    if (monstroA.velocidade > monstroB.velocidade) {
      vencedor = monstroA
    } else if (monstroB.velocidade > monstroA.velocidade) {
      vencedor = monstroB
    } else {
      // Empate total
      tipoVitoria = "empate"
      vencedor = null
    }
  }

  return {
    vencedor,
    tipoVitoria,
    detalhes: {
      danoA,
      danoB,
      vidaRestanteA: Math.max(0, vidaRestanteA),
      vidaRestanteB: Math.max(0, vidaRestanteB),
    },
  }
}

// cor da raridade
export function obterCorRaridade(raridade: Raridade): string {
  const cores: Record<Raridade, string> = {
    comum: "bg-gray-400",
    raro: "bg-blue-500",
    epico: "bg-purple-600",
    lendario: "bg-amber-500",
  }
  return cores[raridade]
}

export function obterMonstrosHome(): Monstro[] {
  return gerarMonstrosAleatorios(3)
}
