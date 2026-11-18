# elMyutant: learning notes

My notes for the elMyutant project, by stage, with answers to the checkpoint questions at the end.

## Stage 1: routes and Git
- A folder in `app/` is a route. `app/blog/page.tsx` is `/blog`. The `app/` folder is not part of the URL.
- A page is a component with a `default export`.
- `Link` from `next/link` navigates without a full page reload. Check it in the Network tab.
- Run `npm` and `git` from inside the project folder, not from the folder above.
- Commit after each stage: `git add .`, `git commit -m "..."`, `git push`.
- Never commit `.env*.local` or the Supabase `service_role` key.

## Stage 2: the OS look
**Fonts, config and layout**
- `lib/config.ts` holds the site name in one place (`SITE`), so I change it once.
- `next/font` downloads fonts and serves them from my own site. `variable: "--ui"` creates a CSS variable.
- `layout.tsx` wraps every page. `{children}` is where the current page goes. Anything placed in the layout (like `MenuBar`) stays on screen while pages change.

**Server and client components**
- Components are server components by default.
- A component needs `"use client"` (exact lowercase, first line) when it uses clicks, `useState`, `useEffect` or `useRouter`.
- `Window` is a client component because of the close button. `MenuBar` is a server component because it has no interaction.
- A client component can wrap server content through `children`.

**React basics**
- Props are a component's inputs. `{title}` inserts a JavaScript value into JSX.
- An optional prop (`closeHref?: string`) with a default (`= "/"`) keeps old callers working.
- A list needs a unique `key` on each item. If the list is plain strings that don't repeat, the string is its own key.
- A capitalized name in JSX (`<Icon />`) is a component. A lowercase one is an HTML tag.
- `useState("")` holds a value. `useEffect` runs only in the browser, after the page appears. `[]` means "run once". Its return function cleans up (`clearInterval`).
- The clock starts empty so the server HTML and the browser HTML match, which avoids a hydration warning.
- `router.back()` depends on history and breaks on direct links. An explicit `closeHref` always works.

**Imports and files**
- `@/` means the project root. A file must sit where its import path points.
- Files with JSX must end in `.tsx`. Dozens of errors in one file usually mean a wrong name.
- A missing closing `}` is a syntax error, and Next.js stops updating until it's fixed.

**CSS**
- Class names must match exactly, including capital letters.
- `.menubar nav` means "a nav inside .menubar". The space means "inside of".
- Hover styles go inside `@media (hover: hover)`.
- `margin-left: auto` pushes an item to the right.
- Grid items with an explicit column still use auto-placement for the row. Give them the same `grid-row`.
- `transform: translateY()` moves something by exact pixels. Padding on a centered box moves it by half.
- A rule with a missing or extra brace makes the browser drop it silently.

## Stage 3: Supabase blog
**Database and security**
- Row Level Security makes the database decide who can read or write each row. A **grant** decides whether a role can touch a table at all, and a **policy** decides which rows. I need both.
- The `anon` key is safe in the browser only because of RLS. The `service_role` key is never used in my code.
- RLS hides rows without an error. An empty list with `error: null` means check the data and the policies. `console.log({ data, error })` tells the difference fast.

**Reading data**
- A server component can be `async` and `await` data directly.
- Data fetching goes in `lib/`, and the page stays thin.
- A `[slug]` folder is a dynamic route. In Next.js 16 `params` is a Promise (`Promise<{ slug: string }>`) and I `await` it.
- `notFound()` shows the 404 page.
- Empty arrays and objects are truthy. `null` is falsy. `?? []` is right for a list, wrong for a single item.

**Login and writing data**
- `@supabase/ssr` stores the login in cookies, so the server knows who I am.
- A server action needs lowercase `"use server"` and a `<form action={fn}>` that contains the inputs and the submit button.
- Always check `getUser()` inside the action too. A page check isn't enough, because anyone can call an action directly. RLS is a third layer.
- Supabase calls return `{ data, error }`. Always destructure and check `error`. A failed insert doesn't throw by itself.
- Ids are UUID strings. `Number(id)` gives `NaN`, and an update that matches zero rows doesn't error. Type them as `string`.
- Markdown is stored as plain text and turned into HTML at render time.

## Stage 4: illustrations
- Supabase bucket and table names are case-sensitive, and policies refer to them by exact name. `new row violates row-level security policy` on an upload can mean the bucket name doesn't match.
- Server actions have a 1 MB body limit by default, so I raise it in `next.config.mjs`. On Vercel the real ceiling is about 4.5 MB per request, so use `4mb`.
- Upload first, insert the row second, and delete the file if the insert fails, so no orphans are left.
- `next/image` needs `remotePatterns` for the Supabase host. Config changes need a server restart.
- `fill` needs a positioned parent (`position: relative`). Without one the image stretches over the whole screen.
- Without stored dimensions: `width={0} height={0}` plus CSS `width: 100%; height: auto` keeps the real proportions. CSS `columns` gives a masonry layout.
- I resize to 2000 px and convert to WebP with `sharp` on upload (1,859 KB became 79 KB). Originals stay on my computer.
- Free tier: 1 GB file storage, 500 MB database, 5 GB egress per month.

## Stage 5: films, work, effects, deploy
**External data**
- The Letterboxd RSS feed is XML. `fast-xml-parser` turns it into objects. `parseTagValue: false` keeps everything as text, and `isArray` makes sure a one-item feed is still a list.
- External data is untrusted: I parse it to plain text, decode entities (`&#039;`), and never inject its HTML. React escapes `{text}` by default. `dangerouslySetInnerHTML` is only for text I wrote myself.
- `fetch(..., { next: { revalidate: 3600 } })` caches the feed for an hour, so new reviews show up without a redeploy.
- The feed only holds ~50 entries. The page says so and links to the full list.
- Filter out entries that aren't films, or the title becomes `"undefined"`.

**Reading the URL and sorting**
- Sort choices live in the URL (`?sort=rating`). A server page reads `searchParams` (a Promise).
- I validate the value before using it, because anyone can type `?sort=banana`. `[...films].sort(...)` sorts a copy, since `sort` changes the original.
- Equal CSS rules stack and the later one wins. Search for a selector before pasting a new rule for it.

**Client components with behaviour**
- `Tape` is a client component: `e.preventDefault()` stops the link, `setPulled(true)` adds a class, `setTimeout` waits for the animation, then `router.push`. The early `return`s keep ctrl+click and reduced motion working.
- `Menu` uses `useRef` to know if a click was inside, a `useEffect` that adds listeners and removes them in its cleanup, and a toggle `setOpen(!open)`.
- A conditional `{open && ...}` unmounts its content, so state inside it is lost. That's why Shut Down is its own route.
- `useState` is needed for things React must redraw. A plain variable changes but the screen doesn't.

**Screen effects**
- Effects are controlled by attributes on `<html>` (`data-scan`, `data-glow`, `data-motion`). CSS reacts to them, and Settings flips them and saves to `localStorage`.
- A small script in `<head>` applies the saved choice before the first paint, so there's no flash. `suppressHydrationWarning` on `<html>` is needed because the script changes it before React looks.
- Default for animations follows the visitor's `prefers-reduced-motion`.

**Deploy**
- Vercel builds on every push. `main` is the live site, other branches get preview URLs.
- Environment variables go in Vercel's settings. Only the anon key, never `service_role`.
- Windows ignores file-name capitals, Linux (Vercel) doesn't. `menu.tsx` vs `Menu.tsx` breaks a deploy.
- Supabase Site URL must be set to the live address.

## Workflow
- Changes apply on save. Restart only for `next.config`, `.env.local` or a new `npm install`.
- `rm -rf .next` clears the build cache when things look stale.
- `ERESOLVE` means two packages need incompatible versions of a third. `--legacy-peer-deps` is a last resort. Don't run `npm audit fix --force`.
- When something looks wrong: terminal first, then the browser console/Inspect, then the file itself (`cat`, `dir`, `grep`).
- On two machines: `git pull` before starting, commit and push when stopping. `.env.local` is recreated by hand.
- Before saving a file with blanks, Ctrl+F for `___`.
- AI tools edit files when allowed to. Ask for READ-ONLY advice, then check `git status` and `git diff` before committing.

## Checkpoint questions
Quick self-test. Cover the answer, try to say it out loud, then check.

1. Why is the menu bar in `layout.tsx` and not copied into every page?
   - My answer: Because it's the same everywhere. In the layout I write it once and it just stays there while `{children}` swaps. If I pasted it into each page, I'd repeat myself and it would remount on every navigation.
2. Why does `MenuBar` get away without `"use client"` but `Window` doesn't?
   - My answer: `MenuBar` is just links plus a clock, so it can render on the server. `Window` has a close button that uses `useRouter`, and that only exists in the browser, so it needs `"use client"`.
3. Why did I give `Clock` its own file?
   - My answer: The clock ticks every second, so it needs `useState` and `useEffect`, so it has to be a client component. In its own file only the clock ships as client code, and `MenuBar` stays a server component.
4. What's that `[]` at the end of `useEffect` doing?
   - My answer: It's the dependency list. Empty means "run once, after the first render in the browser". The function I return from the effect is the cleanup, which runs when the component goes away.
5. Why does every server action call `getUser()` when the page already checked?
   - My answer: The page check only protects the page. A server action is basically a public endpoint, so someone could call it directly without ever opening my admin page. Checking inside the action makes it say no even then. RLS in the database is the third lock.
6. Grants vs RLS policies: what's the difference?
   - My answer: A grant says whether a role (`anon`, `authenticated`) can touch a table at all. A policy says which rows it can see or change. I need both. No grant means nothing works, no policy means RLS quietly shows zero rows.
7. Why did `Number(id)` break the update without any error?
   - My answer: My ids are UUID strings, and `Number("some-uuid")` is `NaN`. The update matched zero rows, and in Supabase an update that matches nothing isn't an error, so it silently did nothing. Typing the id as `string` would have caught it.
8. Why upload the file first and insert the row second?
   - My answer: If I insert first and the upload fails, the gallery shows a broken image. File first means a row only exists when its file does. If the insert then fails, I delete the file so nothing is left orphaned.
9. Why do I turn the Letterboxd review into plain text instead of showing the HTML?
   - My answer: It comes from outside my code, so I can't trust it. If I injected its HTML, a script inside could run on my site. I turn it into plain paragraphs and render them with `{text}`, which React escapes for me.
10. How do new reviews show up without me redeploying?
   - My answer: `revalidate: 3600` tells Next.js to reuse the cached feed for an hour. After that, the next visitor triggers a fresh fetch from Letterboxd, so new reviews just appear.
11. Why check `?sort=` before using it?
   - My answer: Anyone can type `?sort=banana` in the address bar. `SORTERS["banana"]` is `undefined`, and calling it would crash the page. I check against the allowed list and fall back to `recent`.
12. Why does `Tape` need `"use client"` but the films page doesn't?
   - My answer: `Tape` reacts to clicks, keeps state (`pulled`) and uses `useRouter`, so it has to run in the browser. The films page only fetches and renders, so it stays on the server and hands the tape contents down as `children`.
13. What does the `return` inside `useEffect` do in `Menu`?
   - My answer: It's the cleanup: it removes the two document listeners when the menu goes away. Without it, every time the menu showed up it would add more listeners that never leave, leaking memory and running stale handlers.
14. Why is a script in `<head>` applying my saved effects instead of React?
   - My answer: React runs after the page loads, so the page would paint with scanlines and then switch them off, a visible flash. The script runs before the first paint and sets the `data-` attributes on `<html>` right away. `suppressHydrationWarning` is there because it changes `<html>` before React looks.
15. Why did `menu.tsx` vs `Menu.tsx` only matter on Vercel?
   - My answer: Windows doesn't care about capital letters in file names, so `menu.tsx` matched `import Menu`. Vercel runs Linux, where they're two different files, so the import would fail and the deploy would break. VS Code warned me.
16. What happened with my two `.tile img` rules?
   - My answer: CSS doesn't replace a rule, it stacks them, and the later one wins for any property they both set. The old `aspect-ratio: 1` and `object-fit: cover` were second, so they overrode `height: auto` and everything stayed square. Search for a selector before pasting a new one.
17. Why is the Supabase `anon` key okay to have in the browser?
   - My answer: It only has the access that RLS and grants give the `anon` role, which is reading published posts and illustrations. Anyone can see the key, but it can't do more than that. The `service_role` key skips RLS, so it never goes in my code or in git.
18. Why are `params` and `searchParams` Promises in Next.js 16, and what do I do about it?
   - My answer: Next can start rendering before it has the request details, so they arrive as Promises. I type them as `Promise<...>` and `await` them in the (async) server component: `const { slug } = await params`.
19. What does `notFound()` do, and when did I use it?
   - My answer: It stops rendering and shows the 404 page. I use it when a lookup finds nothing, like `/blog/some-slug` or `/films/nope`, so the visitor gets a proper 404 and not a crash or a blank page.
20. What does the `key` prop do in a list, and what makes a good one?
   - My answer: React uses it to tell items apart between renders. It has to be different for each item and stable, like an id or a slug, or a string that never repeats (a tech name, a sort option). The array index is a last resort.
21. Why does `next/image` with `fill` stretch over the whole screen sometimes?
   - My answer: `fill` makes the image `position: absolute` and sized to its nearest positioned parent. If no parent has `position: relative` (or absolute), it falls back to something huge, like the page. The fix is a positioned parent with a size.
22. How do the gallery tiles keep their real proportions without stored width and height?
   - My answer: I give `Image` `width={0} height={0}` plus a `sizes` hint, and let the CSS do `width: 100%; height: auto`. The browser works out the height from the real image once it loads, and CSS `columns` gives the masonry layout.
23. What's the point of `@media (prefers-reduced-motion)` and my Settings switch?
   - My answer: Some people get dizzy or distracted by animation, and their system tells the browser so. I only run animations when they haven't asked for less, and the Settings switch lets visitors choose for themselves. The default follows their system.
24. Why did I lower `bodySizeLimit` to 4 MB?
   - My answer: Vercel limits the body of a request to a serverless function to about 4.5 MB. My form allowed 10 MB, so big drawings would work on my laptop and fail in production. 4 MB keeps me under the real limit.
25. Why work on a git branch for the desktop stage?
   - My answer: The live site deploys from `main`. On a branch I can break things freely, Vercel builds a separate preview address for it, and I merge only when it's good. If it goes badly, `main` is untouched.
