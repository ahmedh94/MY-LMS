import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { BookOpen, Home, LayoutDashboard, LogOutIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,

} from "@/components/ui/avatar"
import { useSignOut } from "@/hooks/use-singout";

interface iUserProps{
    name: string;
    email: string;
    image: string;
}

export default function UserDropdown({name, email, image}: iUserProps) {

    const handleSignOut = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="/profile" className="rounded-full border-green-500 border-3 outline-none">
          {/*<AvatarDemo/>*/}
          <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
    </div>
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="start">
        <DropdownMenuLabel>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
            <Home size={16} className="opacity-60" aria-hidden="true"/>
            <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/courses">
            <BookOpen size={16} className="opacity-60" aria-hidden="true"/>
            <span>Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
            <LayoutDashboard size={16} className="opacity-60" aria-hidden="true"/>
            <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true"/>
            <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
