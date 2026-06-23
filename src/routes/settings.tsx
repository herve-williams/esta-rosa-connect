import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Lock, Check } from "lucide-react";
import { useApp } from "@/lib/store";
import { toCSV, downloadFile } from "@/lib/helpers";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Paramètres — EstaRosa" }] }),
  component: Settings,
});

function Settings() {
  const { pin, setPin, contacts } = useApp();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function changePin() {
    setMsg(null);
    if (current !== pin) return setMsg({ type: "err", text: "Code actuel incorrect." });
    if (!/^\d{4}$/.test(next)) return setMsg({ type: "err", text: "Le nouveau code doit comporter 4 chiffres." });
    if (next !== confirm) return setMsg({ type: "err", text: "La confirmation ne correspond pas." });
    setPin(next);
    setCurrent(""); setNext(""); setConfirm("");
    setMsg({ type: "ok", text: "Code mis à jour." });
  }

  function exportCSV() {
    downloadFile(`estarosa-contacts-${Date.now()}.csv`, toCSV(contacts));
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-5 md:px-10 py-6 md:py-10 space-y-8">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-sm text-muted-foreground mt-1">Sécurité et export.</p>
        </header>

        {/* PIN */}
        <section className="rounded-2xl bg-card border border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Changer le code PIN</h2>
              <p className="text-xs text-muted-foreground">4 chiffres requis à l'ouverture de l'app</p>
            </div>
          </div>
          <div className="space-y-3">
            <Field label="Code actuel" value={current} onChange={setCurrent} />
            <Field label="Nouveau code" value={next} onChange={setNext} />
            <Field label="Confirmer" value={confirm} onChange={setConfirm} />
          </div>
          {msg && (
            <p className={msg.type === "ok" ? "text-success text-sm" : "text-destructive text-sm"}>{msg.text}</p>
          )}
          <button
            onClick={changePin}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-brand text-primary-foreground text-sm font-medium"
          >
            <Check className="h-4 w-4" /> Enregistrer
          </button>
        </section>

        {/* Export */}
        <section className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Exporter les contacts</h2>
              <p className="text-xs text-muted-foreground">{contacts.length} contacts au format CSV</p>
            </div>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal text-primary-foreground text-sm font-medium"
          >
            <Download className="h-4 w-4" /> Télécharger CSV
          </button>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        type="password"
        inputMode="numeric"
        maxLength={4}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm tracking-[0.5em] text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </label>
  );
}
