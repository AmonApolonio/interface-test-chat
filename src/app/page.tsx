"use client";

import { useState } from "react";
import { App } from "antd";
import TestForm from "@/components/TestForm";
import ResultModal from "@/components/ResultModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import { FormData, RequestParams } from "@/types";
import { generateResponse } from "@/services/api";
import { exportToPDF, copyToClipboard } from "@/utils/pdfExport";

function HomePage() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState("");
  const [requestParams, setRequestParams] = useState<RequestParams | null>(null);
  const [formData, setFormData] = useState<FormData>({
    ocasiao: "",
    estilo: undefined,
    genero: "Feminino",
    idade: undefined,
    localizacao: false,
    coloracao: undefined,
    biotipo: undefined,
    proporcoes: undefined,
  });

  const handleGerarResposta = async () => {
    setLoading(true);

    try {
      const { result, params } = await generateResponse(formData);
      setResult(result);
      setRequestParams(params);
      setModalVisible(true);
    } catch (error) {
      console.error("Erro:", error);
      message.error("Erro ao gerar resposta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!requestParams) return;

    copyToClipboard(requestParams, result)
      .then(() => {
        message.success("Texto copiado para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar:", err);
        message.error("Erro ao copiar texto.");
      });
  };

  const handleExportPDF = () => {
    if (!requestParams) return;
    exportToPDF(requestParams, result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 pt-24">
      {/* Loading Overlay */}
      {loading && <LoadingOverlay text="Gerando resposta..." />}

      {/* Result Modal */}
      <ResultModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        result={result}
        requestParams={requestParams}
        onCopy={handleCopyText}
        onExport={handleExportPDF}
      />

      {/* Content */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8">
        <TestForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleGerarResposta}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <App>
      <HomePage />
    </App>
  );
}