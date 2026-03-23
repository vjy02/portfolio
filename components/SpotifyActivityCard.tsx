import React from "react";
import "@/app/globals.css";

export interface Track {
  songUrl: string;
  imageUrl: string;
  title: string;
  artist: string;
}

export const SpotifyActivityCard = ({ track }: { track: Track }) => {
  return (
    <iframe
      src={track.songUrl}
      style={{ border: "none", display: "block" }}
      height="80"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  );
};
