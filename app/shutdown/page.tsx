import Link from "next/link";

export const metadata = { title: "Shut down" };

export default function ShutdownPage() {
  return (
    <div className="shutdown">
      <p>
        It&apos;s now safe to turn off
        <br />
        your computer.
      </p>
      <Link className="pill" href="/">Turn it back on</Link>
    </div>
  );
}