import jsPDF from "jspdf";
import { RequestParams } from "@/types";

export const exportToPDF = (requestParams: RequestParams, result: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = 20;

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PARÂMETROS DA BUSCA", margin, yPosition);
  yPosition += lineHeight * 2;

  // Parameters
  doc.setFontSize(11);

  const params = [
    { label: "Ocasião:", value: requestParams.resumo || "—" },
    { label: "Gênero:", value: requestParams.genero || "—" },
    { label: "Estilo:", value: requestParams.estilo_pessoal || "—" },
    { label: "Idade:", value: requestParams.idade || "—" },
    { label: "Coloração:", value: requestParams.coloracao_pessoal || "—" },
    { label: "Biotipo:", value: requestParams.tipo_corporal || "—" },
    { label: "Proporções:", value: requestParams.proporcao || "—" },
    { label: "Peso Visual:", value: requestParams.peso_visual || "—" },
    {
      label: "Localização:",
      value:
        requestParams.latitude && requestParams.longitude
          ? `${requestParams.latitude}, ${requestParams.longitude}`
          : "—",
    },
  ];

  params.forEach((param) => {
    // Print label in bold
    doc.setFont("helvetica", "bold");
    doc.text(param.label, margin, yPosition);
    const labelWidth = doc.getTextWidth(param.label);
    
    // Print value in normal font
    doc.setFont("helvetica", "normal");
    doc.text(` ${param.value}`, margin + labelWidth, yPosition);
    yPosition += lineHeight;
  });

  yPosition += lineHeight;

  // Result title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("RESULTADO", margin, yPosition);
  yPosition += lineHeight * 2;

  // Result content
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const resultLines = doc.splitTextToSize(result, pageWidth - margin * 2);
  resultLines.forEach((line: string) => {
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(line, margin, yPosition);
    yPosition += lineHeight;
  });

  // Save the PDF
  doc.save("resultado-gennie.pdf");
};

export const copyToClipboard = (requestParams: RequestParams, result: string) => {
  const textToCopy = `PARÂMETROS DA BUSCA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ocasião: ${requestParams.resumo || "—"}
Gênero: ${requestParams.genero || "—"}
Estilo: ${requestParams.estilo_pessoal || "—"}
Idade: ${requestParams.idade || "—"}
Coloração: ${requestParams.coloracao_pessoal || "—"}
Biotipo: ${requestParams.tipo_corporal || "—"}
Proporções: ${requestParams.proporcao || "—"}
Peso Visual: ${requestParams.peso_visual || "—"}
Localização: ${
    requestParams.latitude && requestParams.longitude
      ? `${requestParams.latitude}, ${requestParams.longitude}`
      : "—"
  }

RESULTADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${result}`;

  return navigator.clipboard.writeText(textToCopy);
};
