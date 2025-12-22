"use client";

import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const {data: session,} = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect to login page
      toast.success("Successfully signed out!"); 
    },
  },
});
  }
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-red-500">ALMS</h1>
      <ThemeToggle />
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <button
            onClick={signOut}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Log out</button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
