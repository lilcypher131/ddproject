import { useAuth } from "@/contexts/AuthContext";

export function useUserId(): number | null {
  const { user } = useAuth();
  return user?.id || null;
}