import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: "Comprehensive Course",
    description: "Access to a wide range of courses and resources",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description: "Engage with interactive content and real-time feedback",
    icon: "💻",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your progress and set goals",
    icon: "📊",
  },
  {
    title: "Social Learning",
    description: "Connect with other learners and share knowledge",
    icon: "👥",
  }
]

export default function Home() {
  
 /*  const {data: session,} = authClient.useSession();
 
 async function signOut() {
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect to login page
      toast.success("Successfully signed out!"); 
    },
  },
});
  }*/ 
 /* return (
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
        <div className="mt-4">
        <Link
            href="/login"
            className="px-4 py-2 bg-white text-black rounded">Log in</Link>
        </div>
      )}
    </div>
  );*/

  return (
    <>

    <section className="relative py-20">
      <div className="flex flex-col items-center text-center space-y-8">
        <Badge variant="outline">
          The Future of Learning Management System
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          ALMS is built for arabic users
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl"> 
           Discover a New Wy to Learn with our Modern,
           interactive Learning Management System.
           Access high-quality courses anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link className={buttonVariants({
            size: "lg",
          })} href="/courses">
            Explore Courses
            </Link>

            <Link className={buttonVariants({
            size: "lg",
            variant: "outline",
          })} href="/login">
            Sign In
            </Link>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
      {
        features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-2xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))
      }
      
    </section>
    </>
  );
}
