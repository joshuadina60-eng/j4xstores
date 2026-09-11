import React from "react";
import "./globals.css";
import ChatSlide from "@/components/ChatSlide";

export const metadata = {
  title: "j4xstores",
  description: "j4xstores - storefront",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <ChatSlide />
      </body>
    </html>
  );
}
