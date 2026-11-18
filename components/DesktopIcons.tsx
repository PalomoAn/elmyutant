import Link from "next/link";
import { BlogIcon, ArtIcon, FilmsIcon, WorkIcon, SettingsIcon, WelcomeIcon, TrashIcon} from "@/components/icons";

const ICONS = [
  { href: "/welcome", label: "Welcome", Icon: WelcomeIcon },
  { href: "/work", label: "Projects", Icon: WorkIcon },
  { href: "/blog", label: "Diary", Icon: BlogIcon },
  { href: "/art", label: "Drawings", Icon: ArtIcon },
  { href: "/films", label: "Video Store", Icon: FilmsIcon },
  { href: "/settings", label: "Settings", Icon: SettingsIcon},
  { href: "/trash", label: "Trash", Icon: TrashIcon},

];

export default function DesktopIcons() {
  return (
    <nav className="icons">
      {ICONS.map(({ href, label, Icon }) => (
        <Link key={href} href={href} className="icon">
          <Icon />
          <span className="icon-label">{label}</span>
        </Link>
      ))}
    </nav>
  );
}