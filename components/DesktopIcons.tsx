import Link from "next/link";
import { BlogIcon, ArtIcon, FilmsIcon } from "@/components/icons";

const ICONS = [
  { href: "/blog", label: "Diary", Icon: BlogIcon },
  { href: "/art", label: "Drawings", Icon: ArtIcon },
  { href: "/films", label: "Video Store", Icon: FilmsIcon },
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