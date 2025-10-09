"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar os dados da API
  const fetchPostData = async () => {
    setIsLoading(true);
    setError(null);
    setPost(null);

    try {
      // Se for usar uma url base como variável de ambiente:
      // Usar process.env.NOME_DA_VARIAVEL, ex:
      // const URL_BASE = process.env.NEXT_PUBLIC_BASE_URL; <--- Para usar em client-side
      // const URL_BASE = process.env.BASE_URL; <--- Para usar em server-side
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/5"
      );

      if (!response.ok) {
        throw new Error("Falha ao buscar os dados da API.");
      }

      const data: Post = await response.json();
      setPost(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8 bg-[#FFF9E5]">

      <h1 className="text-4xl font-bold animate-bounce">Andrey Duelos</h1>

      <div className="min-w-11/12 h-15 bg-amber-700 fixed bottom-0 flex justify-around items-center rounded-t-md">
          <div className="h-28 w-24 -translate-y-6 flex flex-col items-center justify-center gap-2 border-1 rounded-t-[5px] border-b-0 border-black bg-[#d4a061] p-1.5 animate-bounce">
            <p className="text-sm">Nome do bicho</p>
            <img src="https://www.dnd5eapi.co/api/images/monsters/aboleth.png" className="rounded-sm max-h-13" alt="" />
          </div>
          <div className="h-28 w-24 -translate-y-6 flex flex-col items-center justify-center gap-2 border-1 rounded-t-[5px] border-b-0 border-black bg-[#d4a061] p-1.5 animate-bounce delay-200">
            <p className="text-sm">Nome do bicho</p>
            <img src="https://www.dnd5eapi.co/api/images/monsters/adult-black-dragon.png" className="rounded-sm max-h-13" alt="" />
          </div>
          <div className="h-28 w-24 -translate-y-6 flex flex-col items-center justify-center gap-2 border-1 rounded-t-[5px] border-b-0 border-black bg-[#d4a061] p-1.5 animate-bounce delay-400">
            <p className="text-sm">Nome do bicho</p>
            <img src="https://www.dnd5eapi.co/api/images/monsters/acolyte.png" className="rounded-sm max-h-13" alt="" />
          </div>
      </div>

      <Button className="p-4 text-3xl h-auto cursor-pointer" variant="destructive">
        Iniciar batalha
      </Button>
      
      <Button className="p-4 text-2xl h-auto cursor-pointer rounded-full bg-amber-300 z-10 fixed top-2 right-2" variant="link">
        <i className="fa-solid fa-treasure-chest fa-beat"></i>
      </Button>

      {/* <Dialog>
        <DialogTrigger asChild>
          <Button onClick={fetchPostData}>Buscar Dados da API</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resposta da API</DialogTitle>
            <DialogDescription>
              {isLoading && "Carregando..."}
              {error && `Erro: ${error}`}
            </DialogDescription>
          </DialogHeader>

          {post && (
            <div className="mt-4 space-y-2">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.body}</p>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </main>
  );
}
