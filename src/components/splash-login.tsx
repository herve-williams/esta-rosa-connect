import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/store";
import { BrandMark } from "@/components/brand-mark";

export function SplashLogin() {
  const { pin, setAuthed } = useApp();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (digits.every((d) => d !== "")) {
      const entered = digits.join("");
      if (entered === pin) {
        setSuccess(true);
        setTimeout(() => setAuthed(true), 450);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setDigits(["", "", "", ""]);
          refs.current[0]?.focus();
        }, 450);
      }
    }
  }, [digits, pin, setAuthed]);

  function handleChange(i: number, v: string) {
    const clean = v.replace(/\D/g, "").slice(-1);
    setDigits((d) => {
      const next = [...d];
      next[i] = clean;
      return next;
    });
    if (clean && i < 3) refs.current[i + 1]?.focus();
  }

  function handleKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-6">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full gradient-brand blur-3xl opacity-40" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full gradient-brand blur-3xl opacity-30" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className={success ? "transition-transform duration-500 scale-110" : ""}>
          <BrandMark size={140} animate />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gradient-brand animate-in fade-in slide-in-from-bottom-3 duration-700">
          EstaRosa
        </h1>
        <p className="mt-2 text-sm text-muted-foreground animate-in fade-in duration-1000">
          Prospection professionnelle · Douala
        </p>

        <div className={`mt-12 flex gap-3 ${shake ? "animate-shake" : ""}`}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              className="w-14 h-16 text-center text-2xl font-bold rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Code à 4 chiffres</p>
      </div>
    </div>
  );
}
