import { FormData, RequestParams, MaterialBlockPayload, MaterialResponse } from "@/types";

const API_URL = "https://dev.n8n.oigennie.ai/webhook/1cd69978-e485-4cf4-ab4d-1f1f7df8ab05";
const MATERIALS_API_URL = "https://dev.n8n.oigennie.ai/webhook/e0a6b09b-7703-488f-96bc-98368a44c6cc";

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
  const response = await fetch(API_URL, {
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
  const response = await fetch(MATERIALS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar materiais indexados");
  }

  const data = await response.json();
  return data;
};

export const updateMaterialData = async (descricao: string, id: number, table: string): Promise<void> => {
  const response = await fetch(MATERIALS_API_URL, {
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
