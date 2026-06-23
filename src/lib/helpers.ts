import { type Contact, type Status } from "@/data/contacts";

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function priorityColor(p: Contact["priority"]) {
  if (p === "high") return "bg-destructive";
  if (p === "medium") return "bg-warning";
  return "bg-muted-foreground";
}

export function statusColor(s: Status) {
  switch (s) {
    case "new": return "bg-info/20 text-info border-info/30";
    case "contacted": return "bg-warning/20 text-warning border-warning/30";
    case "interested": return "bg-teal/20 text-teal border-teal/30";
    case "meeting": return "bg-primary/20 text-primary border-primary/30";
    case "client": return "bg-success/20 text-success border-success/30";
    case "lost": return "bg-destructive/20 text-destructive border-destructive/30";
  }
}

export function waLink(phone: string, message: string, business = false) {
  const clean = phone.replace(/[^\d]/g, "");
  const text = encodeURIComponent(message);
  if (business) {
    return `https://api.whatsapp.com/send?phone=${clean}&text=${text}&app_absent=0`;
  }
  return `https://wa.me/${clean}?text=${text}`;
}

export function personalize(template: string, name: string) {
  return template.replace(/\{nom\}/g, name);
}

export function toCSV(contacts: Contact[]) {
  const header = [
    "name","phone","zone","rating","reviews","priority","status","facebook","instagram","email","site","notes"
  ];
  const rows = contacts.map((c) =>
    header.map((k) => {
      const v = String((c as any)[k] ?? "");
      if (v.includes(",") || v.includes('"') || v.includes("\n")) {
        return `"${v.replace(/"/g, '""')}"`;
      }
      return v;
    }).join(",")
  );
  return [header.join(","), ...rows].join("\n");
}

export function downloadFile(filename: string, content: string, type = "text/csv") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
