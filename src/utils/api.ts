const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const callApiAsync = async <T>(
  route: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  payload: unknown,
  onSuccess: (data: T) => void,
  onError?: (error: unknown) => void
): Promise<T | undefined> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    // pega token automaticamente
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      headers["Authorization"] = `Bearer ${storedToken}`;
    }

    const response = await fetch(`${API_URL}${route}`, {
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data: T = await response.json();
    onSuccess(data);
    return data;

  } catch (error) {
    console.error("Erro ao chamar API:", error);
    if (onError) onError(error);
    return undefined;
  }
};