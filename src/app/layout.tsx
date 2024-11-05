import type { Metadata } from "next";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "今日运势",
  description: "输入姓名、性别、年龄，查看今日运势",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
