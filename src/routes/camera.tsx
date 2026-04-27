import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, Loader2, ArrowRight } from "lucide-react";
import { MOODS, randomCameraMood, type Mood } from "@/lib/songs";
import { toast } from "sonner";

export const Route = createFileRoute("/camera")({
  component: CameraPage,
});

type Phase = "idle" | "live" | "analyzing" | "result";

function CameraPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [mood, setMood] = useState<Mood | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setPhase("live");
    } catch (e) {
      console.error(e);
      toast.error("Could not access your camera. Try the mood quiz instead.");
    }
  };

  const analyze = () => {
    setPhase("analyzing");
    setTimeout(() => {
      const m = randomCameraMood();
      setMood(m);
      setPhase("result");
      streamRef.current?.getTracks().forEach((t) => t.stop());
    }, 2000);
  };

  const meta = mood ? MOODS[mood] : null;

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-6 py-8 sm:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">Camera mood</h1>
        <p className="mt-2 text-muted-foreground">We'll take a quick look and read your vibe. Nothing is uploaded.</p>

        <div className="glass-card relative mt-8 aspect-square w-full overflow-hidden rounded-3xl sm:aspect-video">
          {phase === "idle" && (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow">
                <CameraIcon className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="max-w-xs text-sm text-muted-foreground">
                Tap below to enable your camera. We'll only use it on this page.
              </p>
              <Button onClick={startCamera} className="btn-glow hover:btn-glow-hover h-11 rounded-full px-6 text-primary-foreground border-0">
                Enable camera
              </Button>
            </div>
          )}

          {(phase === "live" || phase === "analyzing") && (
            <>
              <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
              {phase === "analyzing" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-sm">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="font-display text-lg">Reading your expression…</p>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </>
          )}

          {phase === "result" && meta && (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center" style={{ background: meta.gradient }}>
              <div className="text-7xl">{meta.emoji}</div>
              <h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground">{meta.label}</h2>
              <p className="mt-1 text-primary-foreground/80">{meta.tagline}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
          {phase === "live" && (
            <Button onClick={analyze} className="btn-glow hover:btn-glow-hover h-11 rounded-full px-6 text-primary-foreground border-0">
              Analyze my mood
            </Button>
          )}
          {phase === "result" && mood && (
            <Button
              onClick={() => navigate({ to: "/results", search: { mood } })}
              className="btn-glow hover:btn-glow-hover h-11 rounded-full px-6 text-primary-foreground border-0"
            >
              See my songs <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
