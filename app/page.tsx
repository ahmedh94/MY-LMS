import { ThemeToggle } from "@/components/ui/themeToggle";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-red-500">ahmed</h1>
      <ThemeToggle />
      {session ? (
        <p>{session.user.name}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
