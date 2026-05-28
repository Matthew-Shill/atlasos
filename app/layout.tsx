import type { Metadata } from "next";
import { Orbitron, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AtlasOS — Run your service business from one dashboard",
  description:
    "AtlasOS is a fictional portfolio demo showcasing premium websites, client portals, CRM, booking, messaging, automations, and SaaS-style dashboards for service businesses.",
  openGraph: {
    title: "AtlasOS — Service Business Operating Platform",
    description:
      "Interactive portfolio demo: scheduling, CRM, messaging, payments, and automation in one polished experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} ${orbitron.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
