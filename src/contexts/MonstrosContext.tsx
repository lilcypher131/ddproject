"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import { Carta } from "../types/carta";

type MonstrosContextType = {
  monstros: Carta[];
  setMonstros: (m: Carta[]) => void;
};

const MonstrosContext = createContext<MonstrosContextType | undefined>(undefined);

export const MonstrosProvider = ({ children }: { children: ReactNode }) => {
  const [monstros, setMonstros] = useState<Carta[]>([]);
  return (
    <MonstrosContext.Provider value={{ monstros, setMonstros }}>
      {children}
    </MonstrosContext.Provider>
  );
};

export const useMonstros = () => {
  const context = useContext(MonstrosContext);
  if (!context) throw new Error("useMonstros deve ser usado dentro de MonstrosProvider");
  return context;
};
