import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://dev.n8n.oigennie.ai/webhook/1cd69978-e485-4cf4-ab4d-1f1f7df8ab05";

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

    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao enviar requisição" },
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
