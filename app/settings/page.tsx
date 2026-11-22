import WindowStack from "@/components/WindowStack";
import { readDesk, type SearchParams } from "@/lib/windows";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/settings", await searchParams)} />;
}
