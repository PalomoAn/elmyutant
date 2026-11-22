# Adding pages

How to add a new window to the desktop, and how to add a page that isn't a window. The example is an imaginary "Music" window at `/music`.

## Checklist
1. Register the window in `lib/windows.ts` (type + `WINDOWS` entry).
2. Write the content as a component in `components/`.
3. Add a `case` for it in `components/WindowStack.tsx`.
4. Create `app/music/page.tsx` (the same few lines as every window).
5. Add a desktop icon (and a menu item if I want one).
6. Add the route to `app/sitemap.ts`.

## 1. Register it in `lib/windows.ts`
Add the id to the type, and an entry with its route, title, size and position:
```ts
export type WinId = "welcome" | "work" | "blog" | "art" | "films" | "settings" | "trash" | "music";

export const WINDOWS: Record<WinId, WinDef> = {
  // ...
  music: { route: "/music", title: "Music", width: 600, x: 110, y: 44 },
};
```
- `WINDOWS` is a `Record<WinId, …>`, so TypeScript complains if I add the id and forget the entry.
- `title` is used for the title bar and the browser tab title.
- `x` and `y` are where the window opens, measured from below the menu bar. Pick values that don't sit exactly on top of another window.

## 2. Write the content as a component
`components/MusicContent.tsx` holds what goes inside the window, with no `<Window>` around it:
```tsx
import Link from "next/link";
import { go, type Desk } from "@/lib/windows";

export default async function MusicContent({ desk }: { desk: Desk }) {
  // fetch data here if needed
  return (
    <>
      <p>Songs I have on repeat.</p>
      <Link href={go(desk, "/music/some-song")}>Some song</Link>
    </>
  );
}
```
- **Every internal link uses `go(desk, "/path")`**, never a plain `"/path"` string. A plain string drops `?open=` and closes the other windows.
- To change a filter: `go(desk, "/art", { tag: "oc" })`. A string sets it, `null` clears it, and leaving it out keeps it.
- External links (`https://…`, `mailto:`) stay as normal `<a>` tags.
- No links inside? Then it doesn't need the `desk` prop (like `WorkContent` and `TrashContent`).

## 3. Add it to `components/WindowStack.tsx`
One line in the `Content` switch, plus the import:
```tsx
case "music": return <MusicContent desk={desk} />;
```
TypeScript **won't** warn me if I forget this. The window would open empty.

## 4. Create `app/music/page.tsx`
```tsx
import WindowStack from "@/components/WindowStack";
import { readDesk, windowMetadata, type SearchParams } from "@/lib/windows";

export const metadata = windowMetadata("music");

export default async function MusicPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/music", await searchParams)} />;
}
```
- `windowMetadata` gives the tab title and the canonical URL (without `?open=`).
- If the content reads from Supabase, add `export const dynamic = "force-dynamic";` like Drawings and Diary.

## 5. Put it on the desktop
- **Icon:** draw a pixel icon in `components/icons.tsx`, then add it to `ICONS` in `components/DesktopIcons.tsx`:
  ```tsx
  { href: "/music", label: "Music", Icon: MusicIcon },
  ```
- **Menu (optional):** in `components/MenuBar.tsx`, use `DeskLink`, not `Link`, so it keeps `?open=`:
  ```tsx
  <DeskLink role="menuitem" href="/music">Music</DeskLink>
  ```
- **Space check:** an 8th icon makes the column taller. Check a short laptop screen (about 1366×650) and make sure all icons still fit. If not, adjust the `max-height` media queries for `.icons` in `app/globals.css`.

## 6. Add it to the sitemap
If it should show up on Google, add `"/music"` to the `windows` list in `app/sitemap.ts`. If it has detail pages, add those too (like posts, drawings and films).

## Detail pages (`/music/[id]`)
Detail pages are **not** added to `WINDOWS`. They open in front, and their list window stays open behind them. Copy `app/art/[id]/page.tsx`:
```tsx
const { id } = await params;
const desk = readDesk(`/music/${id}`, await searchParams);
// ...fetch the item, notFound() if missing

return (
  <WindowStack desk={desk}>
    <Window id="music-view" title={song.title} closeHref={closeFocusedHref(desk)}>
      ...
    </Window>
  </WindowStack>
);
```
- `id="music-view"`: one id shared by all songs, so the window keeps its drag position and doesn't pop when going from one song to the next.
- `closeHref={closeFocusedHref(desk)}`: closing goes back to the `/music` list.
- Add `generateMetadata` for the tab title, and wrap the fetch in React's `cache()` so the page and the metadata share one database call (see `app/art/[id]/page.tsx`).
- Prev/next links inside it also use `go(desk, ...)`.

## Pages that aren't windows
A page like `/shutdown`, which should never sit behind other windows, needs none of this: just the folder and a `page.tsx`, like before. Links to it are plain `Link`s. Give it `export const metadata = { title: "..." }` for the tab title.

## Quick test after adding a window
- Open it from the icon: it pops in, and the window I was on stays open behind it.
- Click a link inside it: the other windows stay open.
- Close it: the window behind comes forward.
- Type `/music?open=art,films` in the address bar: three windows, Music in front.
- On the phone width (under 760px), only the front window shows.
- `npm run build` passes.
