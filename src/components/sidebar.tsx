import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Send, Sparkles, Settings, LogOut } from "lucide-react";
import { useApp } from "@/lib/store";
import { BrandLockup } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, accent: "text-primary" },
  { to: "/contacts", label: "Contacts", icon: Users, accent: "text-teal" },
  { to: "/broadcast", label: "Broadcast", icon: Send, accent: "text-success" },
  { to: "/assistant", label: "Assistant IA", icon: Sparkles, accent: "text-violet" },
  { to: "/settings", label: "Paramètres", icon: Settings, accent: "text-muted-foreground" },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { setAuthed } = useApp();
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-5 border-b border-sidebar-border">
        <BrandLockup />
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", active ? it.accent : "")} />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setAuthed(false)}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Verrouiller
        </button>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-sidebar border-t border-sidebar-border safe-bottom">
      <div className="grid grid-cols-5">
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium",
                active ? it.accent : "text-sidebar-foreground/60"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{it.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
