import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesPage() {
    return (
        <>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Courses</h1>
            <Link href="/admin/courses/create" className={buttonVariants()}>Add Course</Link>
        </div>

        <div className="">
            <h1>You will see your courses here</h1>
        </div>
        </>
    )
}