import {
  Avatar,
  AvatarFallback,
  AvatarImage,

} from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/134266773?v=4" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
