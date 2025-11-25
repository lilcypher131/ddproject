"use client";

import { MonstrosProvider } from "@/contexts/MonstrosContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MonstrosProvider>
        {children}
      </MonstrosProvider>
    </AuthProvider>
  );
}

