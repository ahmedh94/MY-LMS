"use server"

import { prisma } from "@/lib/db";
import { courseSchema, CourseSchema } from "@/lib/zodSchemas"
import { ApiResponse } from "@/lib/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function CreateCourse(data: CourseSchema): Promise<ApiResponse> {
    try {

        const sassion = await auth.api.getSession({
            headers: await headers(),
        })

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
                userId: sassion?.user?.id as string,
            },
        });

        return {
            status: 'success',
            message: 'Course Created Successfully',
        }

    } catch (error) {
        return {
            status: "error",
            message: "Failed to create course",
        };
    }

}