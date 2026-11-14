import Link from "next/link";

import {SITE} from "@/lib/config";
import Clock from "@/components/Clock"; 
export default function MenuBar() {
  return (
    <header className="menubar">
         <strong>{SITE.name}</strong>
         <nav>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
         </nav>
         <Clock/>
    </header>
  );
}