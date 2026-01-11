import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AvatarDemo from "./Avatar"
import Link from "next/link"
import { BookOpen, Home, LayoutDashboard } from "lucide-react"

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="/profile" className="rounded-full border-green-500 border-3 outline-none">
          <AvatarDemo/>
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="start">
        <DropdownMenuLabel>
            <h3 className="font-medium">Ahmed Hasan</h3>
            <p className="text-xs text-muted-foreground">ahmed.h_199438@yahoo.com</p>
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
        <DropdownMenuItem>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
