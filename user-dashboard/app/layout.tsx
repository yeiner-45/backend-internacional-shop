import type { Metadata } from "next";
import "./globals.css";
import { AudioPlayerProvider } from "@/context/audio-player";
import { StickyAudioPlayer } from "@/components/sticky-audio-player";

export const metadata: Metadata = { title: "Mi cuenta | International Sounds", description: "Biblioteca de sonidos y licencias" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><AudioPlayerProvider>{children}<StickyAudioPlayer /></AudioPlayerProvider></body></html>;
}
