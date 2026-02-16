"use server"

import { prisma } from "@/lib/db";
import { courseSchema, CourseSchema } from "@/lib/zodSchemas"
import { ApiResponse } from "@/lib/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function CreateCourse(data: CourseSchema): Promise<ApiResponse> {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || !session.user) {
            return {
                status: "error",
                message: "Unauthorized",
            };
        }

        const validation = courseSchema.safeParse(data);

        if (!validation.success) {
            return {
                status: "error",
                message: "Invalid Form Data",
            };
        }

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session.user.id as string,
            },
        });

        return {
            status: 'success',
            message: 'Course Created Successfully',
        }

    } catch (error: any) {
        console.error("Create Course Error:", JSON.stringify(error, null, 2));
        return {
            status: "error",
            message: "Failed to create course",
        };
    }

}