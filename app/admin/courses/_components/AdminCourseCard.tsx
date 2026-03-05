import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Link from "next/link";
import Image from "next/image";
import { TimerIcon } from "lucide-react";

interface AdminCourseCardProps {
    data: AdminCourseType;
}

export function AdminCourseCard({ data }: AdminCourseCardProps) {
    const thumbnailUrl = useConstructUrl(data.fileKey);
    return (
        <Card className="group relative p-5">
            {/* dropdown */}
            <div></div>
            <Image src={thumbnailUrl} alt="Thumbnail Url" width={400} height={300} className="rounded-xl" />

            <CardContent className="px-2">
                <Link href={`/admin/courses/${data.id}`} className="font-medium text-lg line-clamp-2 hover:text-primary transition-colors">
                    {data.title}
                </Link>

                <p className="text-sm text-muted-foreground">{data.smallDescription}</p>

                <div className="mt-4 flex items-center gap-x-5">
                    <div>
                        <TimerIcon className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{data.duration}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}