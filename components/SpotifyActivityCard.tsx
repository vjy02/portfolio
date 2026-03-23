"use client";

import { useEffect, useState } from "react";

export interface Track {
  songUrl: string;
  imageUrl: string;
  title: string;
  artist: string;
}

const FALLBACK_TRACK: Track = {
  songUrl: "https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp",
  imageUrl: "",
  title: "",
  artist: "",
};

export const SpotifyActivityCard = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem("spotifyTrack");
    if (cached) {
      setTrack(JSON.parse(cached));
      setIframeLoaded(true);
      return;
    }
    async function fetchSpotify() {
      try {
        const res = await fetch("/api/spotify", { cache: "no-store" });
        if (!res.ok) throw new Error("Spotify fetch failed");
        const tracks: Track[] = await res.json();
        const current = tracks?.[0] || FALLBACK_TRACK;
        setTrack(current);
        sessionStorage.setItem("spotifyTrack", JSON.stringify(current));
      } catch {
        setTrack(FALLBACK_TRACK);
      }
    }
    fetchSpotify();
  }, []);

  return (
    <div className="relative w-full h-[80px]">
      {(!track || !iframeLoaded) && (
        <div className="absolute inset-0 rounded-md bg-neutral-800 animate-pulse opacity-95 flex items-center gap-4 px-4">
          <div className="h-12 w-12 bg-neutral-700 rounded-sm" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-neutral-700 rounded w-3/4" />
            <div className="h-3 bg-neutral-700 rounded w-1/2" />
          </div>
        </div>
      )}
      {track && (
        <iframe
          src={track.songUrl}
          className={`w-full h-[80px] transition-opacity duration-300 ${
            iframeLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ border: "none", display: "block" }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={() => setIframeLoaded(true)}
        />
      )}
    </div>
  );
};
