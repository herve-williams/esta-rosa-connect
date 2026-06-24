import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { INITIAL_CONTACTS, type Contact, type Status } from "@/data/contacts";

export interface Template {
  id: string;
  name: string;
  text: string;
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
}

export interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: { role: "user" | "assistant"; content: string; image?: string }[];
}

interface State {
  authed: boolean;
  setAuthed: (v: boolean) => void;
  pin: string;
  setPin: (p: string) => void;

  contacts: Contact[];
  updateContact: (id: number, patch: Partial<Contact>) => void;

  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  toggleSelected: (id: number) => void;
  clearSelected: () => void;

  templates: Template[];
  addTemplate: (t: Omit<Template, "id">) => void;
  updateTemplate: (id: string, patch: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;

  sectors: Sector[];
  addSector: (s: Omit<Sector, "id">) => void;

  conversations: Conversation[];
  addConversation: (c: Conversation) => void;
  updateConversation: (id: string, patch: Partial<Conversation>) => void;
  deleteConversation: (id: string) => void;
}

const Ctx = createContext<State | null>(null);

const DEFAULT_TEMPLATES: Template[] = [
  {
    id: "t1",
    name: "Présentation",
    text: "Bonjour {nom}, je suis Hervé de EstaRosa. Nous accompagnons les salons de beauté de Douala dans leur visibilité digitale (site, réseaux sociaux, Google Maps). Puis-je vous présenter brièvement nos services ?",
  },
  {
    id: "t2",
    name: "Suivi",
    text: "Bonjour {nom}, je reviens vers vous suite à notre échange. Avez-vous eu le temps de regarder notre proposition ? Je reste disponible pour toute question.",
  },
  {
    id: "t3",
    name: "Promotion",
    text: "Bonjour {nom}, offre spéciale ce mois : -20% sur la création de votre site vitrine + gestion de votre page Instagram. Intéressé(e) ?",
  },
];

const DEFAULT_SECTORS: Sector[] = [
  { id: "salon", name: "Salon de beauté", icon: "✨" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️" },
  { id: "pressing", name: "Pressing", icon: "👔" },
  { id: "hotel", name: "Hotel", icon: "🏨" },
  { id: "snack", name: "Snack-bar", icon: "🥤" },
];

function loadLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveLS(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [pin, setPinState] = useState("2425");
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [templates, setTemplates] = useState<Template[]>(DEFAULT_TEMPLATES);
  const [sectors, setSectors] = useState<Sector[]>(DEFAULT_SECTORS);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPinState(loadLS("er_pin", "2425"));
    setContacts(loadLS("er_contacts", INITIAL_CONTACTS));
    setTemplates(loadLS("er_templates", DEFAULT_TEMPLATES));
    setSectors(loadLS("er_sectors", DEFAULT_SECTORS));
    setConversations(loadLS("er_conversations", []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) saveLS("er_pin", pin); }, [pin, hydrated]);
  useEffect(() => { if (hydrated) saveLS("er_contacts", contacts); }, [contacts, hydrated]);
  useEffect(() => { if (hydrated) saveLS("er_templates", templates); }, [templates, hydrated]);
  useEffect(() => { if (hydrated) saveLS("er_sectors", sectors); }, [sectors, hydrated]);
  useEffect(() => { if (hydrated) saveLS("er_conversations", conversations); }, [conversations, hydrated]);

  const value: State = {
    authed,
    setAuthed,
    pin,
    setPin: setPinState,
    contacts,
    updateContact: (id, patch) =>
      setContacts((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c))),
    selectedIds,
    setSelectedIds,
    toggleSelected: (id) =>
      setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    clearSelected: () => setSelectedIds([]),
    templates,
    addTemplate: (t) =>
      setTemplates((ts) => [...ts, { ...t, id: `t_${Date.now()}` }]),
    updateTemplate: (id, patch) =>
      setTemplates((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t))),
    deleteTemplate: (id) => setTemplates((ts) => ts.filter((t) => t.id !== id)),
    sectors,
    addSector: (s) => setSectors((ss) => [...ss, { ...s, id: `s_${Date.now()}` }]),
    conversations,
    addConversation: (c) => setConversations((cs) => [c, ...cs]),
    updateConversation: (id, patch) =>
      setConversations((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c))),
    deleteConversation: (id) =>
      setConversations((cs) => cs.filter((c) => c.id !== id)),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function statusFromContact(c: Contact): Status {
  return c.status;
}
