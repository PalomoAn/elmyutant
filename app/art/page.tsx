import WindowStack from "@/components/WindowStack";
import { readDesk, windowMetadata, type SearchParams } from "@/lib/windows";

export const metadata = windowMetadata("art");

export const dynamic = "force-dynamic";

export default async function ArtPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/art", await searchParams)} />;
}
