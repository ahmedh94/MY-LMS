import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import { Tabs, TabsList } from "@/components/ui/tabs";

type Params = Promise<{ courseId: string }>;

export default async function EditCoursePage({ params }: { params: Params }) {
    const data = await adminGetCourse((await params).courseId);
    return (
        <div>
            <h1>Edit Course : <span className="text-primary">{data.title}</span></h1>

            <Tabs defaultValue="">
                <TabsList>
                </TabsList>
            </Tabs>
        </div>
    )
}