import WindowStack from "@/components/WindowStack";
import { readDesk, type SearchParams } from "@/lib/windows";

export const metadata = {
  title: { absolute: "elMyutant · Jose, freelance developer" },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/", await searchParams)} />;
}
