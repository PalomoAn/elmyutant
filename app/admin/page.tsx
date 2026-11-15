import Window from "@/components/Window";
import {login} from "../../components/admin/actions";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}){
    const {error} = await searchParams;

    return (
    <Window title="Admin Login">
      <label>
        email
        <input name="email" type="email" required />
      </label>
      <label>
        password
        <input name="password" type="password" required />
      </label>
      <button type="submit">Log in</button>
      {error && <p> Wrong email or password</p>}
    </Window>
    )
}