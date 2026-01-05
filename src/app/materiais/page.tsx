"use client";

import { useState } from "react";
import { App } from "antd";
import MaterialBlock from "@/components/MaterialBlock";
import MaterialModal from "@/components/MaterialModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import { MaterialBlock as MaterialBlockType, MaterialResponse } from "@/types";
import { fetchMaterialData } from "@/services/api";
import { estiloOptions, coloracaoOptions, biotipoOptions, proporcoesOptions, pesoVisualOptions } from "@/constants/formOptions";

const generoOptions = ["Masculino", "Feminino"];
const idadeRanges = [
  { label: "0-25", min: 0 },
  { label: "26-35", min: 26 },
  { label: "36-45", min: 36 },
  { label: "46-60", min: 46 },
  { label: "60-1000", min: 60 },
];

export default function MateriaisIndexadosPage() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<MaterialBlockType | null>(null);
  const [materialData, setMaterialData] = useState<MaterialResponse | null>(null);

  // Generate Estilo x Gênero blocks
  const estiloGeneroBlocks: MaterialBlockType[] = [];
  generoOptions.forEach((genero) => {
    estiloOptions.forEach((estilo) => {
      estiloGeneroBlocks.push({
        id: `${genero}-${estilo}`,
        label: `${genero}\n×\n${estilo}`,
        type: "estilo-genero",
        payload: {
          genero,
          estilo_pessoal: estilo,
        },
      });
    });
  });

  // Generate Estilo x Idade blocks
  const estiloIdadeBlocks: MaterialBlockType[] = [];
  idadeRanges.forEach((idade) => {
    estiloOptions.forEach((estilo) => {
      estiloIdadeBlocks.push({
        id: `${idade.label}-${estilo}`,
        label: `${idade.label}\n×\n${estilo}`,
        type: "estilo-idade",
        payload: {
          idade: String(idade.min),
          estilo_pessoal: estilo,
        },
      });
    });
  });

  // Generate Coloração x Gênero blocks
  const coloracaoGeneroBlocks: MaterialBlockType[] = [];
  generoOptions.forEach((genero) => {
    coloracaoOptions.forEach((coloracao) => {
      coloracaoGeneroBlocks.push({
        id: `${genero}-${coloracao}`,
        label: `${genero}\n×\n${coloracao}`,
        type: "coloracao-genero",
        payload: {
          genero,
          coloracao_pessoal: coloracao,
        },
      });
    });
  });

  // Generate Tipo Corporal blocks
  const tipoCorporalBlocks: MaterialBlockType[] = biotipoOptions.map((biotipo) => ({
    id: `tipo-corporal-${biotipo}`,
    label: biotipo,
    type: "tipo-corporal",
    payload: {
      tipo_corporal: biotipo,
    },
  }));

  // Generate Proporções blocks
  const proporcoesBlocks: MaterialBlockType[] = proporcoesOptions.map((proporcao) => ({
    id: `proporcoes-${proporcao}`,
    label: proporcao,
    type: "proporcoes",
    payload: {
      proporcao: proporcao,
    },
  }));

  // Generate Peso Visual blocks
  const pesoVisualBlocks: MaterialBlockType[] = pesoVisualOptions.map((pesoVisual) => ({
    id: `peso-visual-${pesoVisual}`,
    label: pesoVisual,
    type: "peso-visual" as const,
    payload: {
      peso_visual: pesoVisual,
    },
  }));

  const handleBlockClick = async (block: MaterialBlockType) => {
    setSelectedBlock(block);
    setLoading(true);

    try {
      const data = await fetchMaterialData(block.payload);
      setMaterialData(data);
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
      const err = error as Error & { status?: number };
      if (err.status === 403) {
        message.error("Acesso negado (403). Verifique as credenciais de autenticação.");
      } else if (err.status === 401) {
        message.error("Não autorizado (401). Verifique as credenciais de autenticação.");
      } else {
        message.error("Erro ao buscar materiais indexados. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBlock(null);
    setMaterialData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4">
      {loading && <LoadingOverlay text="Carregando dados..." />}

      <div className="max-w-7xl mx-auto">
        {/* Estilo x Gênero Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Combinação
            </h2>
            <h3 className="text-2xl font-semibold text-gray-900">
              Estilo × Gênero
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {estiloGeneroBlocks.map((block) => (
              <MaterialBlock key={block.id} block={block} onClick={handleBlockClick} />
            ))}
          </div>
        </section>

        {/* Estilo x Idade Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Combinação
            </h2>
            <h3 className="text-2xl font-semibold text-gray-900">
              Estilo × Idade
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {estiloIdadeBlocks.map((block) => (
              <MaterialBlock key={block.id} block={block} onClick={handleBlockClick} />
            ))}
          </div>
        </section>

        {/* Coloração × Gênero Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Combinação
            </h2>
            <h3 className="text-2xl font-semibold text-gray-900">
              Coloração × Gênero
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {coloracaoGeneroBlocks.map((block) => (
              <MaterialBlock key={block.id} block={block} onClick={handleBlockClick} />
            ))}
          </div>
        </section>

        {/* Tipo Corporal Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Análise
            </h2>
            <h3 className="text-2xl font-semibold text-gray-900">
              Tipo Corporal
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {tipoCorporalBlocks.map((block) => (
              <MaterialBlock key={block.id} block={block} onClick={handleBlockClick} />
            ))}
          </div>
        </section>

        {/* Proporções Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Análise
            </h2>
            <h3 className="text-2xl font-semibold text-gray-900">
              Proporções
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {proporcoesBlocks.map((block) => (
              <MaterialBlock key={block.id} block={block} onClick={handleBlockClick} />
            ))}
          </div>
        </section>

        {/* Peso Visual Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Análise
            </h2>
            <h3 className="text-2xl font-semibold text-gray-900">
              Peso Visual
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {pesoVisualBlocks.map((block) => (
              <MaterialBlock key={block.id} block={block} onClick={handleBlockClick} />
            ))}
          </div>
        </section>
      </div>

      <MaterialModal
        visible={modalVisible}
        onClose={handleCloseModal}
        block={selectedBlock}
        data={materialData}
      />
    </div>
  );
}
