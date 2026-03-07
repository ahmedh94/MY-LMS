"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchema } from "@/lib/zodSchemas";

export async function EditCourse(data: CourseSchema, courseId: string): Promise<ApiResponse> {
    const user = await requireAdmin();

    try {
        const result = courseSchema.safeParse(data);

        if (!result.success) {
            return {
                status: "error",
                message: "invalid data",
            };
        }
        await prisma.course.update({
            where: {
                id: courseId,
                userId: user.user.id,
            },
            data: {
                ...result.data,
            }
        });

        return {
            status: "success",
            message: "Course updated successfully",
        };

    } catch (error) {
        return {
            status: "error",
            message: "An unexpected error occurred. Please try again later.",
        };
    }
}