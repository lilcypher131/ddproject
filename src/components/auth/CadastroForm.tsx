"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CadastroFormProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function CadastroForm({ open, onClose, onSwitchToLogin }: CadastroFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const { cadastro } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      await cadastro(email, nome, senha);
      onClose();
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-1">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Seu nome"
            />
          </div>
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
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium mb-1">
              Confirmar Senha
            </label>
            <input
              id="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              minLength={6}
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
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-amber-600 hover:text-amber-700 underline"
            >
              Já tem conta? Faça login
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

