import { obterMonstrosHome } from "@/lib/apiSimulada"
import { Monstro } from "@/types/monstro"

export const getHomeMonsters = () => {
  try {
    const monstros = obterMonstrosHome()

    return {
      timeStamp: new Date().toLocaleString("pt-br"),
      data: monstros.map((m: Monstro) => ({
        nome: m.nome,
        imgUrl: m.imgUrl,
      })),
    }
  } catch (err) {
    console.error("Erro ao buscar monstros:", err)
    return {
      timeStamp: new Date().toLocaleString("pt-BR"),
      data: [],
    }
  }
}
