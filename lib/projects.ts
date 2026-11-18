export type Project = {
  file: string; // title-bar name, like "crm-whatsapp.exe"
  title: string;
  description: string;
  tech: string[];
};

export const PROJECTS: Project[] = [
  {
    file: "crm-whatsapp.exe",
    title: "AI-enabled CRM for small businesses",
    description:
      "A SaaS CRM built around the WhatsApp Business API for small and medium businesses in Mexico. AI analysis of conversations, live updates, and a webhook endpoint for incoming messages.",
    tech: ["React", "Vite", "Node.js", "Express", "Supabase", "WhatsApp Business API"],
  },
  
  {
    file: "esp32-alarm.exe",
    title: "Real-time IoT alarm dashboard",
    description:
      "An ESP32 microcontroller sends alarms to an Express backend, which pushes them to a React dashboard in real time with server-sent events.",
    tech: ["ESP32", "React", "Node.js", "Express", "SSE"],
  },

  {
    file: "this-website.html",
    title: "This site",
    description:
      "Illustration gallery, Letterboxd diary and blog in one place, with a private admin for uploads and posts. Auth, storage and row-level security on Supabase, deployed on Vercel.",
    tech: ["Next.js", "TypeScript", "Supabase", "Vercel"],
  },
];