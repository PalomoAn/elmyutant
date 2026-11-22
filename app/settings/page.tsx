import WindowStack from "@/components/WindowStack";
import { readDesk, windowMetadata, type SearchParams } from "@/lib/windows";

export const metadata = windowMetadata("settings");

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/settings", await searchParams)} />;
}
