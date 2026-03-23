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
  const [showIframe, setShowIframe] = useState(false); // delay rendering iframe

  useEffect(() => {
    const cached = sessionStorage.getItem("spotifyTrack");
    if (cached) {
      const parsed = JSON.parse(cached);
      setTrack(parsed);
      setIframeLoaded(false);
      setShowIframe(false);
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
        setIframeLoaded(false);
        setShowIframe(false);
      } catch {
        setTrack(FALLBACK_TRACK);
      }
    }
    fetchSpotify();
  }, []);

  useEffect(() => {
    if (iframeLoaded) {
      const timeout = setTimeout(() => setShowIframe(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, [iframeLoaded]);

  return (
    <div className="relative w-full h-[80px]">
      {!showIframe && (
        <div className="absolute inset-0 rounded-md bg-neutral-800 flex items-center gap-4 px-4 z-10">
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
          className={`w-full h-[80px] transition-opacity duration-500 ${
            showIframe ? "opacity-100" : "opacity-0"
          }`}
          style={{
            border: "none",
            display: "block",
            background: "transparent",
          }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={() => setIframeLoaded(true)}
        />
      )}
    </div>
  );
};
