import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <div dir="ltr" className="flex justify-center mt-12">
              <a
                className="group/button relative inline-flex items-center justify-center px-6 py-2 text-sm font-medium overflow-hidden transition-all duration-300 bg-[#454641]/20 hover:bg-[#454641]/40 rounded-2xl border border-[#ACAEB1]/10"
                href="https://idanshlomo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10 flex items-center">
                  <span className="text-xs font-medium text-[#ACAEB1] mr-2">Made by</span>
                  <Image
                    className="mr-2 group-hover/button:rotate-12 transition-transform duration-300"
                    src="/is-logo.svg"
                    alt="Idan Shlomo Logo"
                    width={25}
                    height={25}
                  />
                  <span className="font-medium text-sm bg-gradient-to-r from-[#DCDDE1] via-[#DCDDE1]/90 to-[#DCDDE1]/80 bg-clip-text text-transparent">
                    Idan Shlomo
                  </span>
                </span>
              </a>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
