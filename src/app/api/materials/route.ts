import { NextRequest, NextResponse } from "next/server";

const MATERIALS_API_URL = "https://dev.n8n.oigennie.ai/webhook/e0a6b09b-7703-488f-96bc-98368a44c6cc";

const getAuthHeaders = (): HeadersInit => {
  const user = process.env.API_USER;
  const password = process.env.API_PASSWORD;
  const credentials = Buffer.from(`${user}:${password}`).toString("base64");

  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${credentials}`,
  };
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const response = await fetch(MATERIALS_API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar materiais indexados" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const payload = await request.json();

    const response = await fetch(MATERIALS_API_URL, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao salvar alterações" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
