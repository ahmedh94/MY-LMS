"use server";

import { prisma } from "@/lib/db";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteImageAction = async (id: string) => {
    try {
        // 1. أولاً: نحضر بيانات الكورس لنحصل على رابط الصورة الحالي
        const course = await prisma.course.findUnique({
            where: { id },
            select: { imageUrl: true }
        });

        // 2. إذا كان هناك صورة فعلياً، نقوم بحذفها من سيرفرات Uploadthing
        if (course?.imageUrl) {
            // استخراج الـ Key من الرابط
            const urlParts = course.imageUrl.split("/");
            const fileKey = urlParts[urlParts.length - 1];

            if (fileKey) {
                console.log("Deleting file with key:", fileKey);
                const response = await utapi.deleteFiles(fileKey);

                if (!response.success) {
                    console.error("Uploadthing deletion failed:", response);
                    // يمكنك اختيار التوقف هنا أو إكمال مسح الرابط من القاعدة
                }
            }
        }

        // 3. تحديث قاعدة البيانات لمسح الرابط
        await prisma.course.update({
            where: { id },
            data: {
                imageUrl: null,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Delete Error:", error);
        return { error: "Failed to delete image" };
    }
};