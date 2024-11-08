import Navbar from './ui/Navbar';
import type { Metadata } from "next";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "好运盒子 - 好运要及时打开",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
