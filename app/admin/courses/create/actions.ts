"use server"

import { prisma } from "@/lib/db";
import { courseSchema, CourseSchema } from "@/lib/zodSchemas"
import { ApiResponse } from "@/lib/types";
import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";


const aj = arcjet.withRule(
    detectBot({
        mode: 'LIVE',
        allow: [],
    })
).withRule(
    fixedWindow({
        mode: 'LIVE',
        window: '1m',
        max: 2,
    })
);

export async function CreateCourse(data: CourseSchema): Promise<ApiResponse> {


    const session = await requireAdmin();

    try {
        const req = await request();
        const decision = await aj.protect(req, {
            fingerprint: session.user.id,
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    status: 'error',
                    message: "You have been blocked due to rate limiting"
                };
            } else {
                return {
                    status: "error",
                    message: "You are a BOT! if this is a mistake please contact support",
                }
            }
        }

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