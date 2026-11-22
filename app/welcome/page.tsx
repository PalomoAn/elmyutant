import WindowStack from "@/components/WindowStack";
import { readDesk, type SearchParams } from "@/lib/windows";

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/welcome", await searchParams)} />;
}
