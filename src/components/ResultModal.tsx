"use client";

import { Modal, Button } from "antd";
import { RequestParams } from "@/types";

interface ResultModalProps {
  visible: boolean;
  onClose: () => void;
  result: string;
  requestParams: RequestParams | null;
  onCopy: () => void;
  onExport: () => void;
}

export default function ResultModal({
  visible,
  onClose,
  result,
  requestParams,
  onCopy,
  onExport,
}: ResultModalProps) {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="copy" onClick={onCopy}>
          Copiar Texto
        </Button>,
        <Button key="pdf" onClick={onExport}>
          Exportar PDF
        </Button>,
        <Button key="close" type="primary" onClick={onClose}>
          Fechar
        </Button>,
      ]}
      width={800}
      centered
    >
      <div className="space-y-4">
        {/* Parameters Header */}
        <h3 className="font-fraunces font-bold text-lg text-secondary mb-3">
          Parâmetros da Busca
        </h3>
        <div className="bg-selected p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {requestParams && (
              <>
                <div>
                  <strong>Ocasião:</strong> {requestParams.resumo || "—"}
                </div>
                <div>
                  <strong>Gênero:</strong> {requestParams.genero || "—"}
                </div>
                <div>
                  <strong>Estilo:</strong> {requestParams.estilo_pessoal || "—"}
                </div>
                <div>
                  <strong>Idade:</strong> {requestParams.idade || "—"}
                </div>
                <div>
                  <strong>Coloração:</strong> {requestParams.coloracao_pessoal || "—"}
                </div>
                <div>
                  <strong>Biotipo:</strong> {requestParams.tipo_corporal || "—"}
                </div>
                <div>
                  <strong>Proporções:</strong> {requestParams.proporcao || "—"}
                </div>
                <div>
                  <strong>Peso Visual:</strong> {requestParams.peso_visual || "—"}
                </div>
                <div>
                  <strong>Localização:</strong>{" "}
                  {requestParams.latitude && requestParams.longitude
                    ? `${requestParams.latitude}, ${requestParams.longitude}`
                    : "—"}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="font-fraunces font-bold text-lg text-secondary mb-3">Resultado</h3>
          <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto whitespace-pre-wrap text-sm">
            {result}
          </div>
        </div>
      </div>
    </Modal>
  );
}
