import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/saas/Navbar";

const font = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Amazon Product Studio - generate photorealistic product ad listings",
  description: "Generate beautiful, professional ad images featuring your product on various premium backdrops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full dark" style={{ colorScheme: 'dark' }}>
      <body className={`${font.className} h-full w-full flex flex-col antialiased bg-zinc-950 text-zinc-100`}>
        <Providers>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
