import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, School, TimerIcon, MoreVertical, Trash, Pencil, Eye, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface AdminCourseCardProps {
    data: AdminCourseType;
}

export function AdminCourseCard({ data }: AdminCourseCardProps) {
    const thumbnailUrl = useConstructUrl(data.fileKey);
    return (
        <Card className="group relative p-5 gap-0">
            {/* dropdown */}
            <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="icon">
                            <MoreVertical className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${data.id}/edit`} className="flex items-center">
                                <Pencil className="size-4 mr-2" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/courses/${data.slug}`} className="flex items-center">
                                <Eye className="size-4 mr-2" />
                                Preview
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${data.id}/delete`} className="flex items-center">
                                <Trash2 className="size-4 mr-2 text-destructive" />
                                Delete
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Image src={thumbnailUrl} alt="Thumbnail Url" width={400} height={300} className="rounded-xl" />

            <CardContent className="px-2 mt-1">
                <Link href={`/admin/courses/${data.id}/edit`} className="font-medium text-lg line-clamp-2 hover:text-primary transition-colors">
                    {data.title}
                </Link>

                <p className="text-sm text-muted-foreground">{data.smallDescription}</p>

                <div className="mt-4 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-2">
                        <TimerIcon className="size-6 text-muted-foreground bg-primary/10 rounded-full p-1" />
                        <p className="text-sm text-muted-foreground">{data.duration}h</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <School className="size-6 text-muted-foreground bg-primary/10 rounded-full p-1" />
                        <p className="text-sm text-muted-foreground">{data.level}</p>
                    </div>
                </div>

                <Link href={`/admin/courses/${data.id}/edit`} className={buttonVariants({
                    className: "w-full mt-4",
                })}>
                    Edit Course <ArrowRight className="size-4" />
                </Link>
            </CardContent>
        </Card>
    )
}