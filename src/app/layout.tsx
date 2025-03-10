import type { Metadata } from "next";
import { ReactNode } from "react"
import "./globals.css";
import { MSWProvider } from "@/app/_component/MSWComponent";
import AuthSession from "@/app/_component/AuthSession";

if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_MSW_ENABLED !== 'false') {
  const {server} = require('@/mocks/http')
  server.listen();
}
type Props = { children: ReactNode };

export const metadata: Metadata = {
  title: "Z. 무슨 일이 일어나고 있나요? / Z",
  description: "Z.com inspired by X.com",
};

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>
          <AuthSession>
            { children }
          </AuthSession>
        </MSWProvider>
      </body>
    </html>
  );
}
