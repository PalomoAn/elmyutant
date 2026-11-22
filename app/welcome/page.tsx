import WindowStack from "@/components/WindowStack";
import { readDesk, windowMetadata, type SearchParams } from "@/lib/windows";

export const metadata = windowMetadata("welcome");

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <WindowStack desk={readDesk("/welcome", await searchParams)} />;
}
