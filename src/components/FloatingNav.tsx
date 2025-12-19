"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button, Space } from "antd";
import { DatabaseOutlined, ExperimentOutlined } from "@ant-design/icons";

export default function FloatingNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide nav on login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200 px-4 py-2">
        <Space size="small">
          <Button
            type={pathname === "/materiais" ? "primary" : "text"}
            icon={<DatabaseOutlined />}
            onClick={() => router.push("/materiais")}
            className="rounded-full"
            size="large"
          >
            Materiais Indexados
          </Button>
          <Button
            type={pathname === "/" ? "primary" : "text"}
            icon={<ExperimentOutlined />}
            onClick={() => router.push("/")}
            className="rounded-full"
            size="large"
          >
            Testar Respostas
          </Button>
        </Space>
      </div>
    </div>
  );
}
