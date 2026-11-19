import Window from "@/components/Window";
import { login } from "./actions";
export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <Window title="Admin Login">
      <form action={login} className="form">
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        <button type="submit">Log in</button>
        {error && <p>Wrong email or password.</p>}
      </form>
    </Window>
  );
}