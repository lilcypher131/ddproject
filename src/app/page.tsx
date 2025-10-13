"use client";

import { Button } from "@/components/ui/button";
import CartaMonstro from "@/components/cards/cartaMonstro";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Carta } from "@/types/carta";
import { callApiAsync } from "@/utils/api";
import { useMonstros } from "@/contexts/MonstrosContext";

export default function Home() {
  const router = useRouter();
  const { monstros, setMonstros } = useMonstros(); 
  const [exibindoVideo, setExibindoVideo] = useState(false);
  const [carregandoCartas, setCarregandoCartas] = useState(false);

  const carregarCartas = async () => {
    setCarregandoCartas(true);

    await callApiAsync<Carta[]>(
      "/cartas/aleatorias?qtd=3",
      "GET",
      null,
      (data: Carta[]) => {
        console.log("Monstros carregados da API:", data);
        setMonstros(data);
      },
      (e: unknown) => { 
        console.error("Erro ao carregar monstros:", e) 
        setCarregandoCartas(false);
      }
    );

    setExibindoVideo(true);

    setTimeout(() => {
      setCarregandoCartas(false);
      setTimeout(() => {
        setExibindoVideo(false);
      }, 500);
<<<<<<< HEAD
    }, 7000); // 7 segundos
=======
    }, 7000); // 7s
>>>>>>> 80c99fc4922579a8d90fb7198a5c43f60b42ca18
  };

  const iniciarBatalha = () => {
    router.push("/batalha");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8]">
      {exibindoVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              autoPlay
              playsInline
              className="h-full w-auto max-w-full object-contain"
              onEnded={() => {
                if (!carregandoCartas) {
                  setExibindoVideo(false);
                }
              }}
            >
              <source
                src="/assets/videos/andreyzinho_atualizado.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-6 py-3 rounded-full backdrop-blur-sm">
              <p className="text-white text-lg md:text-xl font-bold animate-pulse">
                Abrindo o baú...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
        <div className="text-center space-y-2">
          <h1
            className="text-5xl md:text-6xl font-bold text-amber-900 drop-shadow-lg"
            style={{ fontFamily: "serif" }}
          >
            Andrey Duelos
          </h1>
          <p className="text-amber-700 text-sm md:text-base">
            Prepare-se para a batalha épica!
          </p>
        </div>

        <Button
          className="p-6 md:p-8 text-2xl md:text-3xl h-auto cursor-pointer shadow-xl hover:shadow-2xl transition-all hover:scale-105 rounded-xl font-bold"
          variant="destructive"
          disabled={monstros.length === 0}
          onClick={iniciarBatalha}
        >
          <i className="fa-solid fa-swords mr-3"></i>
          Iniciar Batalha
        </Button>
      </div>

      <div className="w-full max-w-md md:max-w-2xl h-20 md:h-24 bg-gradient-to-t from-amber-800 to-amber-700 fixed bottom-0 left-1/2 -translate-x-1/2 flex justify-around items-end rounded-t-2xl shadow-2xl px-4 pb-2 border-t-4 border-amber-900">
        {monstros.length > 0 ? (
          <div className="flex justify-around items-end w-full gap-2">
            {monstros.map((monstro, index) => (
              <div key={monstro.id}>
                <CartaMonstro
                  monstro={monstro}
                  indiceOnda={index}
                  alturasPulo="4px"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-around items-end w-full gap-2">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-32 w-24 md:h-36 md:w-28 -translate-y-4 flex flex-col items-center justify-center gap-2 border-2 rounded-lg border-purple-900 bg-gradient-to-b from-purple-600 via-blue-600 to-black p-2 shadow-xl animate-pulo-onda"
                  style={
                    {
                      "--altura-pulo": "3px",
                      animationDelay: `${i * 120}ms`,
                    } as React.CSSProperties
                  }
                >
                  <p className="text-white text-sm font-bold">???</p>
                  <div className="h-16 w-16 rounded-xl flex items-center justify-center text-4xl">
                    <i className="fa-solid fa-galaxy fa-spin text-purple-300"></i>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <Button
        onClick={carregarCartas}
        disabled={carregandoCartas || monstros.length > 0}
        className="p-4 text-2xl h-auto cursor-pointer rounded-full bg-amber-300 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed z-10 fixed top-2 right-2 transition-all hover:scale-110"
        variant="link"
      >
        <i
          className={`fa-solid fa-treasure-chest ${
            carregandoCartas ? "fa-beat" : "fa-bounce"
          }`}
        ></i>
      </Button>
    </main>
  );
}
