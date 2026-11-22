"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";
import { go, readDesk } from "@/lib/windows";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

// A link that opens a window and keeps the other windows open (?open=).
function Inner({ href, ...rest }: Props) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const desk = readDesk(pathname, Object.fromEntries(sp));
  return <Link href={go(desk, href)} {...rest} />;
}

export default function DeskLink(props: Props) {
  // useSearchParams needs a Suspense boundary on prerendered pages;
  // until it resolves, a plain link
  return (
    <Suspense fallback={<Link {...props} />}>
      <Inner {...props} />
    </Suspense>
  );
}
