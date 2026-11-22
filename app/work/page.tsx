import WindowStack from "@/components/WindowStack";
import { readDesk, type SearchParams } from "@/lib/windows";

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/work", await searchParams)} />;
}
