"use client";

import { getHomeMonsters } from "@/api/cards";
import { Button } from "@/components/ui/button";
import MonsterCard from "@/components/cards/smCardMonster";
import { useEffect, useState } from "react";

export default function Home() {
  const [monsters, setMonsters] = useState<{ nome: string; imgUrl: string }[]>([]);

  useEffect(() => {
    // const data = getHomeMonsters();
    // setMonsters(data.data); 
  }, []);

  const getMonsters = () => {
    const data = getHomeMonsters();
    setMonsters(data.data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8 bg-[#FFF9E5]">
      <h1 className="text-4xl font-bold animate-bounce">Andrey Duelos</h1>

      <div className="min-w-11/12 h-15 bg-amber-700 fixed bottom-0 flex justify-around items-center rounded-t-md">
      {monsters.length > 0 ? monsters.map((monster, index) => (
        <MonsterCard
          key={index}
          nome={monster.nome}
          imgUrl={monster.imgUrl}
        />
      ))
      :
      <>
        {Array(3).fill(null).map((_, i) => (
          <div
            key={i}
            className="h-28 w-24 -translate-y-6 flex flex-col items-center justify-center gap-2 border-1 rounded-t-[5px] border-b-0 border-black bg-[linear-gradient(180deg,rgba(110,42,155,1)_0%,rgba(87,117,199,1)_50%,rgba(0,0,0,1)_100%)] p-1.5 animate-bounce"
          >
            <p className="text-sm"> ??? </p>
            <div className="h-15 w-15 rounded-xl flex items-center justify-center text-4xl">
              <i className="fa-solid fa-galaxy fa-spin"></i>
            </div>
          </div>
        ))}
      </>
      }
      </div>

      <Button className="p-4 text-3xl h-auto cursor-pointer" variant="destructive">
        Iniciar batalha
      </Button>

      <Button onClick={getMonsters} className="p-4 text-2xl h-auto cursor-pointer rounded-full bg-amber-300 z-10 fixed top-2 right-2" variant="link">
        <i className="fa-solid fa-treasure-chest fa-beat"></i>
      </Button>
    </main>
  );
}
