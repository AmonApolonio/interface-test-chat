"use client";

import { Spin } from "antd";

interface LoadingOverlayProps {
  text?: string;
}

export default function LoadingOverlay({ text = "Carregando..." }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-3 shadow-lg">
        <Spin size="large" />
        <p className="text-base font-medium text-gray-700">{text}</p>
      </div>
    </div>
  );
}
