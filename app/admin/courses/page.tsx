import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { AdminCourseCard } from "./_components/AdminCourseCard";

export default async function CoursesPage() {

    const data = await adminGetCourses();

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Courses</h1>
                <Link href="/admin/courses/create" className={buttonVariants()}>Add Course</Link>
            </div>

            <div className="">
                <h1>You will see your courses here</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.map((course) => (
                    <AdminCourseCard key={course.id} data={course} />
                ))}
            </div>
        </>
    )
}