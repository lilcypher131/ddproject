"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  email: string;
  nome: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  cadastro: (email: string, nome: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao carregar dados de autenticação:", error);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Erro ao fazer login");
    }

    const data = await response.json();
    
    const userData: User = {
      id: data.id,
      email: data.email,
      nome: data.nome,
    };

    setToken(data.token);
    setUser(userData);
    
    // Armazenar no localStorage (apenas token e dados básicos, nunca a senha)
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const cadastro = async (email: string, nome: string, senha: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    
    const response = await fetch(`${API_URL}/auth/cadastro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, nome, senha }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Erro ao cadastrar");
    }

    const data = await response.json();
    
    const userData: User = {
      id: data.id,
      email: data.email,
      nome: data.nome,
    };

    setToken(data.token);
    setUser(userData);
    
    // Armazenar no localStorage
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        cadastro,
        logout,
        isAuthenticated: !!token && !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

