"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export type Track = { id: number; title: string; artist: string; duration: string; genre: string; artwork: string; audio: string };
type PlayerContext = { track: Track | null; playing: boolean; progress: number; volume: number; selectTrack: (track: Track) => void; toggle: () => void; setProgress: (value: number) => void; setVolume: (value: number) => void };
const AudioContext = createContext<PlayerContext | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null); const [playing, setPlaying] = useState(false); const [progress, setProgressState] = useState(0); const [volume, setVolumeState] = useState(.75); const audio = useRef<HTMLAudioElement | null>(null);
  useEffect(() => { const element = new Audio(); audio.current = element; const update = () => setProgressState(element.duration ? (element.currentTime / element.duration) * 100 : 0); element.addEventListener("timeupdate", update); element.addEventListener("ended", () => setPlaying(false)); return () => { element.pause(); element.removeEventListener("timeupdate", update); }; }, []);
  useEffect(() => { if (!audio.current) return; audio.current.volume = volume; }, [volume]);
  useEffect(() => { if (!audio.current || !track) return; audio.current.src = track.audio; if (playing) audio.current.play().catch(() => setPlaying(false)); }, [track]);
  useEffect(() => { if (!audio.current || !track) return; playing ? audio.current.play().catch(() => setPlaying(false)) : audio.current.pause(); }, [playing, track]);
  const selectTrack = (next: Track) => { if (track?.id === next.id) setPlaying(value => !value); else { setTrack(next); setProgressState(0); setPlaying(true); } };
  const setProgress = (value: number) => { if (audio.current?.duration) audio.current.currentTime = (value / 100) * audio.current.duration; setProgressState(value); };
  return <AudioContext.Provider value={{ track, playing, progress, volume, selectTrack, toggle: () => setPlaying(value => !value), setProgress, setVolume: setVolumeState }}>{children}</AudioContext.Provider>;
}
export function useAudioPlayer() { const context = useContext(AudioContext); if (!context) throw new Error("useAudioPlayer must be used within AudioPlayerProvider"); return context; }
