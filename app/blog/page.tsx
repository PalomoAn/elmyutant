import WindowStack from "@/components/WindowStack";
import { readDesk, windowMetadata, type SearchParams } from "@/lib/windows";

export const metadata = windowMetadata("blog");

export const dynamic = "force-dynamic";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/blog", await searchParams)} />;
}
