import { callApiAsync } from "./api";
import type { Carta } from "@/types/carta";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Busca cartas da API e verifica/salva no banco
 * @param quantidade - Quantidade de cartas para buscar
 * @returns Array de cartas (do banco se existirem, da API se forem novas)
 */
export async function buscarCartasApi(
  quantidade: number = 3,
  salvar: boolean = true
): Promise<Carta[]> {
  try {
    const cartas = await callApiAsync<Carta[]>(
      `/cartas/aleatorias?qtd=${quantidade}&salvar=${salvar}`,
      "GET",
      null,
      (data) => data,
      (error) => {
        console.error("Erro ao buscar cartas da API:", error);
        return [];
      }
    );

    if (!cartas || cartas.length === 0) {
      return [];
    }

    return cartas;
  } catch (error) {
    console.error("Erro ao buscar cartas com verificação:", error);
    return [];
  }
}

/**
 * Busca as cartas do usuário pelo ID
 * @param idUsuario - ID do usuário
 * @returns Array de cartas do usuário
 */
export async function buscarCartasUsuario(
  idUsuario: number,
): Promise<Carta[]> {
  try {
    const cartas = await callApiAsync<Carta[]>(
      `/usuarios/${idUsuario}/cartas`,
      "GET",
      null,
      (data) => data,
      (error) => {
        console.error("Erro ao buscar cartas do usuário:", error);
        return [];
      }
    );

    if (!cartas || cartas.length === 0) {
      return [];
    }

    return cartas;
  } catch (error) {
    console.error("Erro ao buscar cartas do usuário com verificação:", error);
    return [];
  }
}