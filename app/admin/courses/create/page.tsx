import { requireAdmin } from "@/app/data/admin/require-admin";
import { CourseCreateForm } from "./_components/course-create-form";

export default async function CreateCoursePage() {
    await requireAdmin();

    return (
        <CourseCreateForm />
    )
}
