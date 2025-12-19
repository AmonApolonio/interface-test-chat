import { FormData, RequestParams, MaterialBlockPayload, MaterialResponse } from "@/types";

export const generateResponse = async (formData: FormData): Promise<{ result: string; params: RequestParams }> => {
  let latitude = null;
  let longitude = null;

  // Get geolocation if enabled
  if (formData.localizacao && navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }
  }

  // Prepare the payload
  const payload: RequestParams = {
    resumo: formData.ocasiao || null,
    genero: formData.genero,
    estilo_pessoal: formData.estilo || null,
    coloracao_pessoal: formData.coloracao || null,
    proporcao: formData.proporcoes || null,
    tipo_corporal: formData.biotipo || null,
    idade: formData.idade ? String(formData.idade) : null,
    latitude,
    longitude,
  };

  // Send POST request
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar requisição");
  }

  const data = await response.json();
  
  return {
    result: data.result || "Nenhum resultado retornado.",
    params: payload,
  };
};

export const fetchMaterialData = async (payload: MaterialBlockPayload): Promise<MaterialResponse> => {
  const response = await fetch("/api/materials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = new Error("Erro ao buscar materiais indexados") as Error & { status: number };
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
};

export const updateMaterialData = async (descricao: string, id: number, table: string): Promise<void> => {
  const response = await fetch("/api/materials", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      descricao,
      id,
      table,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar alterações");
  }
};
