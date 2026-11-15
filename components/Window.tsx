"use client";

import { useRouter } from "next/navigation";

type Props = {
  title: string;
  children: React.ReactNode;
  closeHref?: string;                                
};

export default function Window({ title, children, closeHref = "/" }: Props) {   
  const router = useRouter();

  return (
    <section className="mw">
      <div className="mw-bar">
        <button
          aria-label="Close"
          onClick={() => router.push(closeHref)}       
        >
          x
        </button>
        <span className="mw-title">{title}</span>
      </div>
      <div className="mw-body">{children}</div>
    </section>
  );
}