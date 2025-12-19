"use client";

import { Button, AutoComplete, Select, Segmented, InputNumber, Switch } from "antd";
import { FormData } from "@/types";
import {
  ocasiaoOptions,
  estiloOptions,
  coloracaoOptions,
  biotipoOptions,
  proporcoesOptions,
} from "@/constants/formOptions";

interface TestFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function TestForm({ formData, setFormData, onSubmit, loading }: TestFormProps) {
  const isFormValid = formData.ocasiao.trim() !== "";

  return (
    <div className="space-y-4">
      {/* Ocasião */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Ocasião</label>
        <AutoComplete
          placeholder="Selecione ou digite uma ocasião"
          options={ocasiaoOptions.map((opt) => ({ label: opt, value: opt }))}
          value={formData.ocasiao}
          onChange={(value) => setFormData({ ...formData, ocasiao: value })}
          className="w-full"
          allowClear
        />
      </div>

      {/* Estilo */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Estilo</label>
        <Select
          placeholder="Escolha um estilo"
          options={estiloOptions.map((opt) => ({ label: opt, value: opt }))}
          value={formData.estilo}
          onChange={(value) => setFormData({ ...formData, estilo: value })}
          className="w-full"
        />
      </div>

      {/* Gênero */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Gênero</label>
        <Segmented
          options={["Feminino", "Masculino"]}
          value={formData.genero}
          onChange={(value) => setFormData({ ...formData, genero: value as string })}
          block
        />
      </div>

      {/* Idade, Localização and Coloração */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Idade</label>
          <InputNumber
            placeholder="Digite sua idade"
            min={1}
            max={120}
            value={formData.idade}
            onChange={(value) => setFormData({ ...formData, idade: value || undefined })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Localização</label>
          <div className="flex items-center h-8">
            <Switch
              checked={formData.localizacao}
              onChange={(checked) => setFormData({ ...formData, localizacao: checked })}
              checkedChildren="Ativada"
              unCheckedChildren="Desativada"
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Coloração</label>
          <Select
            placeholder="Escolha uma coloração"
            options={coloracaoOptions.map((opt) => ({ label: opt, value: opt }))}
            value={formData.coloracao}
            onChange={(value) => setFormData({ ...formData, coloracao: value })}
            className="w-full"
          />
        </div>
      </div>

      {/* Biotipo and Proporções */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Biotipo</label>
          <Select
            placeholder="Escolha seu biotipo"
            options={biotipoOptions.map((opt) => ({ label: opt, value: opt }))}
            value={formData.biotipo}
            onChange={(value) => setFormData({ ...formData, biotipo: value })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Proporções</label>
          <Select
            placeholder="Escolha suas proporções"
            options={proporcoesOptions.map((opt) => ({ label: opt, value: opt }))}
            value={formData.proporcoes}
            onChange={(value) => setFormData({ ...formData, proporcoes: value })}
            className="w-full"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="primary"
        size="large"
        block
        className="mt-6"
        onClick={onSubmit}
        loading={loading}
        disabled={!isFormValid}
      >
        Gerar Resposta
      </Button>
    </div>
  );
}
