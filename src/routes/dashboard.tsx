import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { Camera, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  }

  const name = user.email?.split("@")[0] ?? "friend";

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">Hey there 👋</p>
        <h1 className="mt-1 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome back, <span className="text-gradient">{name}</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          How would you like to discover your soundtrack today?
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link to="/camera" className="group glass-card relative overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1">
            <div
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition group-hover:opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold">Camera mood</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Open your camera and let us read your expression in seconds.
              </p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Try it <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link to="/quiz" className="group glass-card relative overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1">
            <div
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition group-hover:opacity-60"
              style={{ background: "var(--gradient-cool)" }}
            />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold">Mood quiz</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Answer a few quick questions to nail your vibe.
              </p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Take the quiz <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
