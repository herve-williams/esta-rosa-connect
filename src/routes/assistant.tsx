import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Plus, Trash2, Paperclip, Sparkles } from "lucide-react";
import { useApp, type Conversation } from "@/lib/store";
import { BrandMark } from "@/components/brand-mark";
import { STATUS_LABELS, type Contact, type Priority } from "@/data/contacts";
import { cn } from "@/lib/utils";

type NewContact = Omit<Contact, "id">;

function parseBulkContacts(text: string, sectors: { id: string; name: string }[]): NewContact[] | null {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  if (blocks.length === 0) return null;
  const results: NewContact[] = [];
  for (const block of blocks) {
    const fields: Record<string, string> = {};
    for (const line of block.split(/\n/)) {
      const m = line.match(/^\s*(Nom|Téléphone|Telephone|Zone|Secteur|Priorité|Priorite|Facebook|Instagram|Site|Email)\s*:\s*(.*)$/i);
      if (m) fields[m[1].toLowerCase().replace("é", "e")] = m[2].trim();
    }
    const name = fields["nom"];
    const phone = fields["telephone"] || fields["téléphone"];
    if (!name || !phone) return null;
    const secRaw = (fields["secteur"] || "").toLowerCase();
    const sec = sectors.find((s) => s.id.toLowerCase() === secRaw || s.name.toLowerCase() === secRaw);
    const prioRaw = (fields["priorite"] || "").toLowerCase();
    const priority: Priority = prioRaw.startsWith("haut") ? "high" : prioRaw.startsWith("bas") ? "low" : "medium";
    results.push({
      name, phone,
      zone: fields["zone"] || "",
      rating: 0, reviews: 0,
      priority,
      sector: sec?.id || sectors[0]?.id || "",
      facebook: fields["facebook"] || "",
      instagram: fields["instagram"] || "",
      email: fields["email"] || "",
      site: fields["site"] || "",
      status: "new",
      notes: "", lastAction: "", subStart: "", subEnd: "",
    });
  }
  return results.length ? results : null;
}

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "Assistant IA — EstaRosa" }] }),
  component: Assistant,
});

const SUGGESTIONS = [
  "Résumé du jour",
  "Prospects à relancer",
  "Analyse pipeline",
  "Abonnements qui expirent",
];

function answer(q: string, contacts: Contact[]): string {
  const ql = q.toLowerCase();
  const total = contacts.length;
  const byStatus = (s: string) => contacts.filter((c) => c.status === s);
  const high = contacts.filter((c) => c.priority === "high");
  const uncontactedHigh = high.filter((c) => c.status === "new");

  if (ql.includes("résumé") || ql.includes("resume") || ql.includes("jour")) {
    return `**Résumé du jour** 📊

- Prospects total : **${total}**
- Nouveaux : **${byStatus("new").length}**
- Contactés : **${byStatus("contacted").length}**
- Intéressés : **${byStatus("interested").length}**
- RDV fixés : **${byStatus("meeting").length}**
- Clients : **${byStatus("client").length}**

Priorité haute non contactée : **${uncontactedHigh.length}** prospects à activer en priorité.`;
  }

  if (ql.includes("relancer") || ql.includes("relance") || ql.includes("prospect")) {
    const list = uncontactedHigh.slice(0, 10);
    if (!list.length) return "Excellent ! Tous vos prospects à priorité haute ont déjà été contactés. 🎯";
    return `**Prospects à relancer en priorité** (${list.length})

${list.map((c, i) => `${i + 1}. **${c.name}** — ${c.zone} · ⭐ ${c.rating}`).join("\n")}

Astuce : utilisez le modèle *Présentation* dans Broadcast pour les contacter en lot.`;
  }

  if (ql.includes("pipeline") || ql.includes("analyse") || ql.includes("conversion")) {
    const contacted = total - byStatus("new").length;
    const clients = byStatus("client").length;
    const conv = total ? ((clients / total) * 100).toFixed(1) : "0";
    const convCont = contacted ? ((clients / contacted) * 100).toFixed(1) : "0";
    return `**Analyse du pipeline** 🔍

- Taux de contact : **${total ? ((contacted / total) * 100).toFixed(1) : 0}%** (${contacted}/${total})
- Conversion globale : **${conv}%**
- Conversion sur contactés : **${convCont}%**

Étapes :
${(["new","contacted","interested","meeting","client","lost"] as const).map(s => `- ${STATUS_LABELS[s]} : ${byStatus(s).length}`).join("\n")}`;
  }

  if (ql.includes("abonn") || ql.includes("expir")) {
    const now = new Date();
    const in7 = new Date(now.getTime() + 7 * 24 * 3600_000);
    const expiring = contacts.filter((c) => {
      if (!c.subEnd) return false;
      const d = new Date(c.subEnd);
      return d >= now && d <= in7;
    });
    if (!expiring.length) return "Aucun abonnement n'expire dans les 7 prochains jours. ✅";
    return `**Abonnements expirant sous 7 jours** (${expiring.length})

${expiring.map((c) => `- **${c.name}** — fin le ${c.subEnd}`).join("\n")}`;
  }

  return `Je peux vous aider sur :
- **Résumé du jour** : aperçu des chiffres clés
- **Prospects à relancer** : priorités hautes non contactées
- **Analyse pipeline** : taux et conversion
- **Abonnements** : expirations à venir

Posez une question, ou utilisez un raccourci ci-dessus.`;
}

function Assistant() {
  const { contacts, conversations, sectors, addContacts, addConversation, updateConversation, deleteConversation } = useApp();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [attached, setAttached] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages.length, thinking]);

  function startNew() {
    const conv: Conversation = {
      id: `c_${Date.now()}`,
      title: "Nouvelle conversation",
      date: new Date().toISOString(),
      messages: [],
    };
    addConversation(conv);
    setActiveId(conv.id);
  }

  function send(text?: string) {
    if (thinking) return;
    const content = (text ?? input).trim();
    if (!content && !attached) return;
    let convId = activeId;
    let baseMessages: Conversation["messages"] = [];
    if (!convId) {
      const conv: Conversation = {
        id: `c_${Date.now()}`,
        title: content.slice(0, 40) || "Image",
        date: new Date().toISOString(),
        messages: [],
      };
      addConversation(conv);
      convId = conv.id;
      setActiveId(conv.id);
    } else {
      baseMessages = conversations.find((c) => c.id === convId)?.messages ?? [];
    }
    const userMsg = { role: "user" as const, content, image: attached ?? undefined };
    const withUser = [...baseMessages, userMsg];
    const isFirst = baseMessages.length === 0;
    updateConversation(convId, isFirst
      ? { messages: withUser, title: content.slice(0, 40) || "Image" }
      : { messages: withUser });
    setInput("");
    const hadAttachment = !!attached;
    setAttached(null);
    setThinking(true);

    const delay = 900 + Math.floor(Math.random() * 900);
    const targetId = convId;
    setTimeout(() => {
      let ai: string;
      if (hadAttachment) {
        ai = "Image bien reçue. 🌸 Comme je n'utilise pas de vision externe, dites-moi ce que vous souhaitez en faire (analyse, légende, idée de message…) et je vous aide.";
      } else {
        const bulk = parseBulkContacts(content, sectors);
        if (bulk && bulk.length > 0) {
          const created = addContacts(bulk);
          const bySector: Record<string, number> = {};
          created.forEach((c) => { bySector[c.sector] = (bySector[c.sector] || 0) + 1; });
          const detail = Object.entries(bySector)
            .map(([sid, n]) => {
              const sec = sectors.find((s) => s.id === sid);
              return `${n} dans **${sec?.name ?? sid}**`;
            })
            .join(", ");
          ai = `✅ ${created.length} contact${created.length > 1 ? "s" : ""} ajouté${created.length > 1 ? "s" : ""} avec succès — ${detail}.`;
        } else {
          ai = answer(content, contacts);
        }
      }
      const aiMsg = { role: "assistant" as const, content: ai };
      updateConversation(targetId, { messages: [...withUser, aiMsg] });
      setThinking(false);
    }, delay);
  }


  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAttached(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex-1 flex min-h-0">
      {/* History */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-surface-1">
        <div className="p-4 border-b border-border">
          <button
            onClick={startNew}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-violet/20 text-violet border border-violet/30 text-sm font-medium hover:bg-violet/30 transition-colors"
          >
            <Plus className="h-4 w-4" /> Nouvelle conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={cn(
                "group flex items-center gap-2 p-2.5 rounded-lg cursor-pointer text-sm",
                activeId === c.id ? "bg-card border border-border" : "hover:bg-card/60"
              )}
            >
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{c.title}</p>
                <p className="text-[10px] text-muted-foreground">{new Date(c.date).toLocaleDateString("fr-FR")}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteConversation(c.id); if (activeId === c.id) setActiveId(null); }}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {conversations.length === 0 && (
            <p className="text-xs text-muted-foreground p-3">Aucune conversation. Commencez ci-dessus.</p>
          )}
        </div>
      </aside>

      {/* Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="px-5 md:px-10 py-5 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet/15 border border-violet/30 flex items-center justify-center text-violet">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Assistant EstaRosa</h1>
            <p className="text-xs text-muted-foreground">Vos données, vos décisions.</p>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 md:px-10 py-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {!active || active.messages.length === 0 ? (
              <div className="text-center py-10">
                <BrandMark size={80} animate />
                <h2 className="mt-4 text-xl font-semibold">Comment puis-je vous aider ?</h2>
                <p className="text-sm text-muted-foreground mt-1">Analyses temps réel sur vos {contacts.length} contacts.</p>
              </div>
            ) : (
              active.messages.map((m, i) => (
                <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
                  {m.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-violet/15 border border-violet/30 flex items-center justify-center shrink-0">
                      <BrandMark size={20} />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap",
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                  )}>
                    {m.image && <img src={m.image} alt="" className="rounded-lg mb-2 max-h-48" />}
                    {m.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="px-5 md:px-10 pb-2 flex flex-wrap gap-2 justify-center">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="px-3 py-1.5 rounded-full bg-card border border-border text-xs hover:border-violet/40 hover:text-violet transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 md:px-10 py-4 border-t border-border">
          <div className="max-w-2xl mx-auto">
            {attached && (
              <div className="mb-2 flex items-center gap-2 p-2 bg-card border border-border rounded-lg">
                <img src={attached} alt="" className="h-10 w-10 rounded object-cover" />
                <span className="text-xs flex-1 text-muted-foreground">Image jointe</span>
                <button onClick={() => setAttached(null)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex items-end gap-2 bg-card border border-border rounded-2xl p-2">
              <button onClick={() => fileRef.current?.click()} className="p-2.5 text-muted-foreground hover:text-violet">
                <Paperclip className="h-4 w-4" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Posez votre question…"
                rows={1}
                className="flex-1 bg-transparent resize-none text-sm focus:outline-none py-2.5 max-h-32"
              />
              <button
                onClick={() => send()}
                className="p-2.5 rounded-xl gradient-brand text-primary-foreground disabled:opacity-40"
                disabled={!input.trim() && !attached}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
