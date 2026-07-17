import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GlobalCinematicWeddingRings } from "@/components/animations/GlobalCinematicWeddingRings";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Joji & Vandana - Wedding Invitation",
  description: "Join us in celebrating our wedding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${poppins.variable} h-full antialiased smooth-scroll`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-poppins bg-background text-darkText overflow-x-hidden transition-colors duration-500">
        <ThemeProvider>
          <GlobalCinematicWeddingRings />
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
