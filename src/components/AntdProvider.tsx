"use client";

import { ConfigProvider, App } from "antd";
import { antdTheme } from "@/theme/antd";
import type { ReactNode } from "react";

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme}>
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}
