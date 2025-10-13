export const callApiAsync = async <T>(
  route: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  payload: unknown,
  onSuccess: (data: T) => void,
  onError?: (error: unknown) => void
): Promise<T | undefined> => {
  try {
    const response = await fetch(`http://localhost:8080${route}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
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
