import Link from "next/link";
import DeskLink from "@/components/DeskLink";
import Clock from "@/components/Clock";
import Menu from "@/components/menu";
import { CandleIcon } from "@/components/icons";
import { SITE } from "@/lib/config";

export default function MenuBar() {
  return (
    <header className="menubar">
      <Menu
        label={
          <>
            <CandleIcon /> {SITE.name}
          </>
        }
      >
        <DeskLink role="menuitem" href="/welcome">About Jose</DeskLink>
        <DeskLink role="menuitem" href="/settings">Settings…</DeskLink>
        <Link role="menuitem" href="/shutdown">Shut Down…</Link>
      </Menu>

      <Menu label="Go">
        <DeskLink role="menuitem" href="/">Desktop</DeskLink>
        <DeskLink role="menuitem" href="/work">My Projects</DeskLink>
        <DeskLink role="menuitem" href="/art">My Drawings</DeskLink>
        <DeskLink role="menuitem" href="/films">Video Store</DeskLink>
        <DeskLink role="menuitem" href="/blog">Diary</DeskLink>
      </Menu>

      <Menu label="Connect">
        <a role="menuitem" href="mailto:andrespalomor@outlook.com">Email</a>
        <a
          role="menuitem"
          href="https://github.com/PalomoAn"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          role="menuitem"
          href={`https://letterboxd.com/${SITE.letterboxd}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Letterboxd
        </a>

        <a
          role="menuitem"
          href={SITE.discord}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </a>
      </Menu>

      <Clock />
    </header>
  );
}