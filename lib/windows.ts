// URL-driven windows.
// The path is the focused window. ?open=art,films lists the windows behind it,
// bottom to top. ?tag= (Drawings) and ?sort= (Video Store) ride along while
// their window is on screen.

export type WinId = "welcome" | "work" | "blog" | "art" | "films" | "settings" | "trash";

export type WinDef = { route: string; title: string; width?: number; x?: number; y?: number };

export const WINDOWS: Record<WinId, WinDef> = {
  welcome: { route: "/welcome", title: "Welcome", width: 560, x: 60, y: 30 },
  work: { route: "/work", title: "Work", width: 760, x: 90, y: 40 },
  blog: { route: "/blog", title: "Diary", width: 520, x: 100, y: 50 },
  art: { route: "/art", title: "Drawings", width: 740, x: 70, y: 34 },
  films: { route: "/films", title: "Video Store", width: 760, x: 80, y: 30 },
  settings: { route: "/settings", title: "Settings", width: 430, x: 120, y: 70 },
  trash: { route: "/trash", title: "Trash", width: 340, x: 130, y: 90 },
};

export const MAX_OPEN = 6;

const IDS = Object.keys(WINDOWS) as WinId[];

function isWinId(s: string): s is WinId {
  return (IDS as string[]).includes(s);
}

export type SearchParams = Record<string, string | string[] | undefined>;

export type Desk = {
  path: string; // current pathname
  current: WinId | null; // focused top-level window (null on /desktop and detail pages)
  parent: WinId | null; // on a detail page (/art/12), the window it belongs to
  open: WinId[]; // windows behind, bottom to top; never includes `current`
  tag?: string;
  sort?: string;
};

// "/art/12" -> { kind: "art", top: false }; "/" counts as Welcome
function classify(path: string): { kind: WinId | null; top: boolean } {
  if (path === "/") return { kind: "welcome", top: true };
  const seg = path.split("/")[1] ?? "";
  if (!isWinId(seg)) return { kind: null, top: false };
  return { kind: seg, top: path === WINDOWS[seg].route };
}

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

// move ids to the top of the stack, drop duplicates, keep the newest MAX_OPEN
function stack(list: WinId[], push: WinId[] = [], drop: (WinId | null)[] = []): WinId[] {
  const out: WinId[] = [];
  for (const id of [...list, ...push]) {
    if (drop.includes(id)) continue;
    const i = out.indexOf(id);
    if (i !== -1) out.splice(i, 1);
    out.push(id);
  }
  return out.slice(-MAX_OPEN);
}

export function readDesk(path: string, sp: SearchParams): Desk {
  const { kind, top } = classify(path);
  const current = top ? kind : null;
  const raw = [sp.open].flat().filter(Boolean).join(",");
  const ids = raw.split(",").filter(isWinId);
  return {
    path,
    current,
    parent: top ? null : kind,
    open: stack(ids, [], [current]),
    tag: first(sp.tag) || undefined,
    sort: first(sp.sort) || undefined,
  };
}

function build(path: string, open: WinId[], tag?: string, sort?: string): string {
  const { kind, top } = classify(path);
  const q: string[] = [];
  if (open.length) q.push(`open=${open.join(",")}`);
  if (tag && ((kind === "art" && top) || open.includes("art"))) q.push(`tag=${encodeURIComponent(tag)}`);
  if (sort && ((kind === "films" && top) || open.includes("films"))) q.push(`sort=${encodeURIComponent(sort)}`);
  return q.length ? `${path}?${q.join("&")}` : path;
}

// Navigate to `path` (a window route or a detail page) and keep the rest open.
// `set.tag` / `set.sort`: a string sets it, null clears it, undefined keeps it.
export function go(
  desk: Desk,
  path: string,
  set: { tag?: string | null; sort?: string | null } = {},
): string {
  const { kind, top } = classify(path);
  const prev = desk.current ?? desk.parent;
  const push = prev && !(top && prev === kind) ? [prev] : [];
  const open = stack(desk.open, push, top ? [kind] : []);
  const tag = set.tag === undefined ? desk.tag : set.tag ?? undefined;
  const sort = set.sort === undefined ? desk.sort : set.sort ?? undefined;
  return build(path, open, tag, sort);
}

// close the focused window: a detail page goes back to its parent,
// a top-level window hands focus to the one just behind it
export function closeFocusedHref(desk: Desk): string {
  if (desk.parent) {
    return build(WINDOWS[desk.parent].route, stack(desk.open, [], [desk.parent]), desk.tag, desk.sort);
  }
  const next = desk.open.at(-1);
  if (!next) return "/desktop";
  return build(WINDOWS[next].route, desk.open.slice(0, -1), desk.tag, desk.sort);
}

// close a window that is behind the focused one
export function closeBehindHref(desk: Desk, id: WinId): string {
  return build(desk.path, stack(desk.open, [], [id]), desk.tag, desk.sort);
}
