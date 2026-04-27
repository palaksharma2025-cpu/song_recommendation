import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { moodFromQuiz, type QuizAnswers } from "@/lib/songs";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

interface Q<K extends keyof QuizAnswers> {
  key: K;
  question: string;
  options: { value: QuizAnswers[K]; label: string; emoji: string }[];
}

const QUESTIONS: Array<Q<keyof QuizAnswers>> = [
  { key: "feeling", question: "How are you feeling today?", options: [
    { value: "great", label: "Pretty great", emoji: "🌟" },
    { value: "okay", label: "Just okay", emoji: "🙂" },
    { value: "low", label: "A bit low", emoji: "🥺" },
  ]},
  { key: "energy", question: "What's your energy level?", options: [
    { value: "low", label: "Low", emoji: "🪫" },
    { value: "medium", label: "Medium", emoji: "🔋" },
    { value: "high", label: "High", emoji: "⚡" },
  ]},
  { key: "vibe", question: "Calm or energetic music?", options: [
    { value: "calm", label: "Calm", emoji: "🌿" },
    { value: "energetic", label: "Energetic", emoji: "🔥" },
  ]},
  { key: "state", question: "Right now, you feel…", options: [
    { value: "stressed", label: "Stressed", emoji: "😤" },
    { value: "relaxed", label: "Relaxed", emoji: "😌" },
    { value: "excited", label: "Excited", emoji: "🤩" },
    { value: "heartbroken", label: "Heartbroken", emoji: "💔" },
    { value: "in_love", label: "In love", emoji: "💗" },
  ]},
  { key: "tempo", question: "Slow grooves or fast beats?", options: [
    { value: "slow", label: "Slow", emoji: "🐢" },
    { value: "fast", label: "Fast", emoji: "🚀" },
  ]},
];

function QuizPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const q = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  const choose = (val: QuizAnswers[keyof QuizAnswers]) => {
    const next = { ...answers, [q.key]: val };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const mood = moodFromQuiz(next as QuizAnswers);
      navigate({ to: "/results", search: { mood } });
    }
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-6 py-8 sm:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Question {step + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "var(--gradient-primary)" }} />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h2 className="font-display text-3xl font-bold leading-tight">{q.question}</h2>
          <div className="mt-8 grid gap-3">
            {q.options.map((opt) => {
              const selected = answers[q.key] === opt.value;
              return (
                <button
                  key={String(opt.value)}
                  onClick={() => choose(opt.value)}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/60 ${selected ? "border-primary bg-primary/10" : "border-border bg-card"}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="flex-1 font-medium">{opt.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              );
            })}
          </div>

          {step > 0 && (
            <div className="mt-6">
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="rounded-full">
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
