import { useState, useEffect } from "react";
import { Modal, Input, Button, Space, App } from "antd";
import { CopyOutlined, SaveOutlined } from "@ant-design/icons";
import { MaterialBlock, MaterialResponse } from "@/types";
import { updateMaterialData } from "@/services/api";

const { TextArea } = Input;

interface MaterialModalProps {
  visible: boolean;
  onClose: () => void;
  block: MaterialBlock | null;
  data: MaterialResponse | null;
}

export default function MaterialModal({ visible, onClose, block, data }: MaterialModalProps) {
  const { message } = App.useApp();
  const [description, setDescription] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDescription(data?.descricao || "");
    setIsEdited(false);
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    message.success("Conteúdo copiado!");
  };

  const handleSave = async () => {
    if (!data) return;
    
    setSaving(true);
    try {
      await updateMaterialData(description, data.id, data.table);
      message.success("Alterações salvas com sucesso!");
      setIsEdited(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      message.error("Erro ao salvar alterações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setIsEdited(true);
  };

  if (!block) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={900}
      footer={null}
      centered
      styles={{
        body: { padding: 0 }
      }}
    >
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        {block.label.replace(/\n/g, " ")}
      </h2>

      {/* Content */}
      <div className="px-4 pt-6 pb-2">
        {data ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Descrição do Material
              </label>
              <Space>
                <Button
                  icon={<CopyOutlined />}
                  onClick={handleCopy}
                  size="small"
                >
                  Copiar
                </Button>
                {isEdited && (
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                    size="small"
                    loading={saving}
                  >
                    Salvar
                  </Button>
                )}
              </Space>
            </div>
            
            <TextArea
              value={description}
              onChange={handleDescriptionChange}
              rows={20}
              className="font-mono text-sm"
              style={{
                resize: 'vertical',
                minHeight: '400px'
              }}
            />

            {isEdited && (
              <div className="text-sm text-amber-600 bg-amber-50 px-3 py-2 mt-2 rounded-lg">
                ⚠️ Você tem alterações não salvas
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhum dado disponível</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
