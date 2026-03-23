import { NextResponse } from 'next/server';

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

export async function GET() {
    try {
        const clientId = process.env.SPOTIFY_CLIENT_ID!;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
        const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

        if (!clientId || !clientSecret || !refreshToken) {
            throw new Error('Missing Spotify credentials in .env');
        }

        const now = Date.now();
        if (!cachedAccessToken || !accessTokenExpiresAt || now >= accessTokenExpiresAt) {
            const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization:
                        'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                }).toString(),
            });

            const tokenData = await tokenRes.json();
            if (!tokenData.access_token) {
                throw new Error(`Token refresh failed: ${JSON.stringify(tokenData)}`);
            }

            cachedAccessToken = tokenData.access_token;
            accessTokenExpiresAt = now + (tokenData.expires_in - 50) * 1000;
        }

        const spotifyRes = await fetch(
            'https://api.spotify.com/v1/me/player/recently-played?limit=1',
            {
                headers: {
                    Authorization: `Bearer ${cachedAccessToken}`,
                },
            }
        );

        const spotifyData = await spotifyRes.json()
        if (spotifyData.error) {
            throw new Error(JSON.stringify(spotifyData.error));
        }

        const strippedSpotifyData = spotifyData.items.map((item: SpotifyItem) => {
            const track = item.track;
            return {
                songUrl: `https://open.spotify.com/embed/track/${track.id}`,
                imageUrl: track.album.images[0].url,
                title: track.name,
                artist: track.artists.map((a: { name: string }) => a.name).join(', '),
            };
        });
        return NextResponse.json(strippedSpotifyData);
    } catch (error) {
        console.error('Spotify API error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}