"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LoginFormProps {
  open: boolean;
  onClose: () => void;
  onSwitchToCadastro: () => void;
}

export default function LoginForm({ open, onClose, onSwitchToCadastro }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await login(email, senha);
      onClose();
      setEmail("");
      setSenha("");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm font-medium mb-1">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••••"
            />
          </div>
          {erro && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {erro}
            </div>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={onSwitchToCadastro}
              className="text-amber-600 hover:text-amber-700 underline"
            >
              Não tem conta? Cadastre-se
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

