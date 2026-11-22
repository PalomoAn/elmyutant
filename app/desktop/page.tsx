import WindowStack from "@/components/WindowStack";
import { readDesk, type SearchParams } from "@/lib/windows";

export const metadata = { title: "Desktop" };

export default async function Desktop({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/desktop", await searchParams)} />;
}
