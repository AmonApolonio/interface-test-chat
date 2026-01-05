export interface FormData {
  ocasiao: string;
  estilo: string | undefined;
  genero: string;
  idade: number | undefined;
  localizacao: boolean;
  coloracao: string | undefined;
  biotipo: string | undefined;
  proporcoes: string | undefined;
  pesoVisual: string | undefined;
}

export interface RequestParams {
  resumo: string | null;
  genero: string;
  estilo_pessoal: string | null;
  coloracao_pessoal: string | null;
  proporcao: string | null;
  tipo_corporal: string | null;
  idade: string | null;
  peso_visual: string | null;
  latitude: number | null;
  longitude: number | null;
}

// Materiais Indexados types
export interface MaterialBlockPayload {
  genero?: string;
  estilo_pessoal?: string;
  idade?: string;
  coloracao_pessoal?: string;
  tipo_corporal?: string;
  proporcao?: string;
  peso_visual?: string;
}

export interface MaterialBlock {
  id: string;
  label: string;
  type: "estilo-genero" | "estilo-idade" | "coloracao-genero" | "tipo-corporal" | "proporcoes" | "peso-visual";
  payload: MaterialBlockPayload;
  highlight?: boolean;
}

export interface MaterialResponse {
  descricao: string;
  id: number;
  table: string;
}
