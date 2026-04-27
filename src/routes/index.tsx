import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Music2, Camera, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [loading, user, navigate]);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="glass-card mx-auto flex max-w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Hindi + English curated for every mood
        </div>

        <h1 className="mt-8 text-center font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          Songs that match <br />
          <span className="text-gradient">how you feel.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-center text-base text-muted-foreground sm:text-lg">
          Open the camera or take a quick quiz. We'll read the room and queue up the perfect playlist.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/signup">
            <Button size="lg" className="btn-glow hover:btn-glow-hover h-12 rounded-full px-8 text-base font-semibold text-primary-foreground border-0">
              Get started — it's free
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="ghost" className="h-12 rounded-full px-8 text-base">
              I already have an account
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Camera, title: "Camera mood", body: "Smile, frown, or stare. We'll guess." },
            { icon: Sparkles, title: "Mood quiz", body: "Six quick questions, one perfect vibe." },
            { icon: Music2, title: "Curated picks", body: "10+ Hindi & English songs each round." },
          ].map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
