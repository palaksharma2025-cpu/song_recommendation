import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RefreshCw, Loader2, ExternalLink } from "lucide-react";
import { MOODS, SONGS, type Mood } from "@/lib/songs";

const VALID: Mood[] = ["happy", "sad", "energetic", "calm", "angry", "romantic"];

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>) => {
    const m = String(search.mood ?? "happy") as Mood;
    return { mood: VALID.includes(m) ? m : ("happy" as Mood) };
  },
  component: ResultsPage,
});

function ResultsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { mood } = Route.useSearch();
  const [fetching, setFetching] = useState(true);
  const [previews, setPreviews] = useState<Record<number, { url: string | null; cover: string | null }>>({});
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    setFetching(true);
    setPreviews({});
    setPlayingIdx(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const t = setTimeout(() => setFetching(false), 700);
    return () => clearTimeout(t);
  }, [mood]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const meta = MOODS[mood];
  const songs = SONGS[mood];

  async function fetchPreview(idx: number) {
    if (previews[idx]) return previews[idx];
    const s = songs[idx];
    try {
      const term = encodeURIComponent(`${s.title} ${s.artist}`);
      const res = await fetch(`https://itunes.apple.com/search?term=${term}&media=music&limit=1`);
      const json = await res.json();
      const r = json?.results?.[0];
      const data = {
        url: (r?.previewUrl as string) ?? null,
        cover: (r?.artworkUrl100 ? String(r.artworkUrl100).replace("100x100", "300x300") : null),
      };
      setPreviews((p) => ({ ...p, [idx]: data }));
      return data;
    } catch {
      const data = { url: null, cover: null };
      setPreviews((p) => ({ ...p, [idx]: data }));
      return data;
    }
  }

  async function togglePlay(idx: number) {
    if (playingIdx === idx && audioRef.current) {
      audioRef.current.pause();
      setPlayingIdx(null);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setLoadingIdx(idx);
    const data = await fetchPreview(idx);
    setLoadingIdx(null);
    if (!data.url) {
      window.open(songs[idx].link, "_blank", "noreferrer");
      return;
    }
    const audio = new Audio(data.url);
    audio.onended = () => setPlayingIdx(null);
    audioRef.current = audio;
    setPlayingIdx(idx);
    audio.play().catch(() => setPlayingIdx(null));
  }

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
        <div className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="absolute inset-0 opacity-60" style={{ background: meta.gradient }} />
          <div className="relative">
            <div className="text-6xl">{meta.emoji}</div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
              You're feeling {meta.label.toLowerCase()}
            </h1>
            <p className="mt-2 text-primary-foreground/80">{meta.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/quiz">
                <Button variant="secondary" className="h-10 rounded-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Retake quiz
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" className="h-10 rounded-full text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                  Back to dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Your playlist</h2>
          <span className="text-sm text-muted-foreground">{songs.length} songs</span>
        </div>

        {fetching ? (
          <div className="mt-6 flex items-center justify-center py-20">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
          </div>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {songs.map((s, i) => (
              <li key={i} className="glass-card group flex items-center gap-4 rounded-2xl p-3 transition hover:-translate-y-0.5">
                <img
                  src={previews[i]?.cover ?? s.cover}
                  alt={`${s.album} cover`}
                  className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{s.title}</h3>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">{s.language}</Badge>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{s.artist}</p>
                  <p className="truncate text-xs text-muted-foreground/70">
                    {s.album}
                    {playingIdx === i && <span className="ml-2 text-primary">• 30s preview</span>}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    onClick={() => togglePlay(i)}
                    aria-label={playingIdx === i ? `Pause ${s.title}` : `Play ${s.title}`}
                    className="btn-glow hover:btn-glow-hover h-10 w-10 rounded-full text-primary-foreground border-0"
                  >
                    {loadingIdx === i ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : playingIdx === i ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${s.title} on YouTube`}
                    title="Open on YouTube"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
