import { NextResponse } from "next/server";

let cachedAccessToken: string | null = null;
let accessTokenExpiresAt: number | null = null;

interface SpotifyArtist {
    id: string;
    name: string;
    external_urls: { spotify: string };
}

interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

interface SpotifyAlbum {
    images: SpotifyImage[];
}

interface SpotifyTrack {
    id: string;
    name: string;
    external_urls: { spotify: string };
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
}

interface SpotifyItem {
    track: SpotifyTrack;
}

export interface Track {
    songUrl: string;
    imageUrl: string;
    title: string;
    artist: string;
}

export async function GET(): Promise<NextResponse<Track[] | { error: string }>> {
    try {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

        if (!clientId || !clientSecret || !refreshToken) {
            return NextResponse.json(
                { error: "Missing Spotify credentials" },
                { status: 500 }
            );
        }

        const now = Date.now();

        // Refresh token if needed
        if (!cachedAccessToken || !accessTokenExpiresAt || now >= accessTokenExpiresAt) {
            const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: refreshToken,
                }),
            });

            if (!tokenRes.ok) {
                return NextResponse.json(
                    { error: "Failed to refresh Spotify token" },
                    { status: 500 }
                );
            }

            const tokenData: { access_token: string; expires_in: number } =
                await tokenRes.json();

            cachedAccessToken = tokenData.access_token;
            accessTokenExpiresAt = now + (tokenData.expires_in - 50) * 1000;
        }

        const spotifyRes = await fetch(
            "https://api.spotify.com/v1/me/player/recently-played?limit=1",
            {
                headers: {
                    Authorization: `Bearer ${cachedAccessToken}`,
                },
            }
        );

        if (!spotifyRes.ok) {
            return NextResponse.json(
                { error: "Failed to fetch Spotify data" },
                { status: 500 }
            );
        }

        const spotifyData: { items: SpotifyItem[] } = await spotifyRes.json();

        if (!spotifyData.items || spotifyData.items.length === 0) {
            return NextResponse.json(
                { error: "No recently played tracks" },
                { status: 404 }
            );
        }

        const strippedSpotifyData: Track[] = spotifyData.items.map((item) => {
            const track = item.track;
            return {
                songUrl: `https://open.spotify.com/embed/track/${track.id}`,
                imageUrl: track.album.images[0]?.url || "",
                title: track.name,
                artist: track.artists.map((a) => a.name).join(", "),
            };
        });

        return NextResponse.json(strippedSpotifyData);
    } catch (error) {
        console.error("Spotify API error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}