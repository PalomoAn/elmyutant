import Link from "next/link";
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
        <Link role="menuitem" href="/welcome">About Jose</Link>
        <Link role="menuitem" href="/settings">Settings…</Link>
        <Link role="menuitem" href="/shutdown">Shut Down…</Link>
      </Menu>

      <Menu label="Go">
        <Link role="menuitem" href="/">Desktop</Link>
        <Link role="menuitem" href="/work">My Projects</Link>
        <Link role="menuitem" href="/art">My Drawings</Link>
        <Link role="menuitem" href="/films">Video Store</Link>
        <Link role="menuitem" href="/blog">Diary</Link>
      </Menu>

      <Menu label="Connect">
        <a role="menuitem" href="mailto:andrespalomor@gmail.cm">Email</a>
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