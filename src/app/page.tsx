"use client";

import { Button } from "@/components/ui/button";
import CartaMonstro from "@/components/cards/cartaMonstro";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMonstros } from "@/contexts/MonstrosContext";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import CadastroForm from "@/components/auth/CadastroForm";
import { buscarCartasApi } from "@/utils/apiCartas";

export default function Home() {
  const router = useRouter();
  const { monstros, setMonstros } = useMonstros();
  const { user, logout, isAuthenticated, token } = useAuth();
  const [exibindoVideo, setExibindoVideo] = useState(false);
  const [carregandoCartas, setCarregandoCartas] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const carregarCartas = async () => {
    setCarregandoCartas(true);

    const cartas = await buscarCartasApi(3);

    if (cartas && cartas.length > 0) {
      setMonstros(cartas);
    }

    setExibindoVideo(true);

    setTimeout(() => {
      setCarregandoCartas(false);
      setTimeout(() => {
        setExibindoVideo(false);
      }, 500);
    }, 7000); // 7 segundos
  };

  const alterarCartas = async () => {
    setCarregandoCartas(true);
    
    const cartas = await buscarCartasApi(3);
    
    if (cartas && cartas.length > 0) {
      setMonstros(cartas);
    }
    
    setCarregandoCartas(false);
  };
  
  const iniciarBatalha = () => {
    router.push("/batalha");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-gradient-to-b from-[#FFF9E5] to-[#F5E6C8]">
      {/* === Pre-carregamento do vídeo === */}
      <video
        ref={videoRef}
        src="/assets/videos/andreyzinho_atualizado.mp4"
        preload="auto"
        muted
        className="hidden"
        playsInline
        onEnded={() => {
          if (!carregandoCartas) {
            setExibindoVideo(false);
          }
        }}
      />

      {exibindoVideo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black">
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
          {isAuthenticated && user && (
            <div className="mt-4 p-3 bg-amber-100 rounded-lg border border-amber-300">
              <p className="text-amber-800 text-sm">
                Olá, <span className="font-bold">{user.nome}</span>!
              </p>
            </div>
          )}
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

      <div className="w-full max-w-md md:max-w-2xl h-20 md:h-24 bg-gradient-to-t from-amber-800 to-amber-700 bottom-0 left-1/2 -translate-x-1/2 flex justify-around items-end rounded-t-2xl shadow-2xl px-4 pb-2 border-t-4 border-amber-900 fixed z-50">
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

      {/* Botão para alterar cartas */}
      {monstros.length > 0 && (
        <Button
          onClick={alterarCartas}
          disabled={carregandoCartas}
          className="p-3 text-xl h-auto cursor-pointer rounded-full bg-blue-300 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed z-10 fixed bottom-24 right-2 transition-all hover:scale-110"
          variant="link"
          title="Alterar cartas"
        >
          <i className="fa-solid fa-shuffle"></i>
        </Button>
      )}

      {/* Botões de Autenticação */}
      <div className="fixed top-2 left-2 z-10 flex gap-2">
        {isAuthenticated ? (
          <>
            <Button
              onClick={() => {
                if (user?.id) {
                  router.push(`/perfil/${user.id}`);
                }
              }}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg cursor-pointer transition-all hover:scale-105"
              title="Ver meu perfil"
            >
              <i className="fa-solid fa-user mr-2"></i>
              Perfil
            </Button>
            
            <Button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              variant="destructive"
            >
              <i className="fa-solid fa-sign-out mr-2"></i>
              Sair
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              <i className="fa-solid fa-sign-in mr-2"></i>
              Login
            </Button>
            <Button
              onClick={() => setShowCadastro(true)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer"
            >
              <i className="fa-solid fa-user-plus mr-2"></i>
              Cadastro
            </Button>
          </>
        )}
      </div>

      {/* Modais de Login e Cadastro */}
      <LoginForm
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToCadastro={() => {
          setShowLogin(false);
          setShowCadastro(true);
        }}
      />
      <CadastroForm
        open={showCadastro}
        onClose={() => setShowCadastro(false)}
        onSwitchToLogin={() => {
          setShowCadastro(false);
          setShowLogin(true);
        }}
      />
    </main>
  );
}
