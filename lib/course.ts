/*
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

        if (course?.imageUrl) {
            const fileKey = course.imageUrl.split("/").pop();
            if (fileKey) {
                await utapi.deleteFiles(fileKey);
            }
        }

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


"use server";

import { prisma } from "@/lib/db";
import { UTApi } from "uploadthing/server";

// تأكد من تعريف الـ API Key هنا لضمان صلاحيات الحذف في الـ Server Actions
const utapi = new UTApi({
    token: process.env.UPLOADTHING_SECRET,
});

export const deleteImageAction = async (id: string) => {
    console.log("الـ ID المستلم في السيرفر هو:", id); // سطر للتأكد

    if (!id || id === "undefined") {
        console.error("خطأ: لم يتم إرسال ID صحيح للسيرفر");
        return { error: "ID is missing" };
    }
    try {
        // 1. جلب بيانات الكورس للتأكد من وجود رابط الصورة
        const course = await prisma.course.findUnique({
            where: { id },
            select: { imageUrl: true }
        });

        if (course?.imageUrl) {
            
            const fileKey = course.imageUrl.split("/f/")[1];

            if (fileKey) {
                console.log("جاري حذف الملف بمفتاح:", fileKey);
                // حذف الملف من سيرفرات Uploadthing
                await utapi.deleteFiles(fileKey);
            }
        }

        // 2. تحديث قاعدة البيانات لمسح الرابط من السجل
        await prisma.course.update({
            where: { id },
            data: {
                imageUrl: null,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("خطأ أثناء الحذف:", error);
        return { error: "فشل حذف الصورة" };
    }
};
*/
"use server";

import { prisma } from "@/lib/db";
import { utapi } from "@/lib/uploadthing-server";

export const deleteImageAction = async (id: string, imageUrl?: string) => {
    console.log("--- Start delete process ---");
    console.log("ID received:", id);
    console.log("Image URL received:", imageUrl);

    try {
        let keyToDelete = "";

        // 1. استخراج المفتاح من الرابط المباشر أولاً
        if (imageUrl && imageUrl.includes("/f/")) {
            keyToDelete = imageUrl.split("/f/")[1];
        }

        // 2. إذا لم يرسل رابط، نبحث في قاعدة البيانات
        if (!keyToDelete && id && id !== "undefined") {
            const course = await prisma.course.findUnique({
                where: { id },
                select: { imageUrl: true }
            });
            if (course?.imageUrl) {
                keyToDelete = course.imageUrl.split("/f/")[1];
            }
        }

        console.log("المفتاح المستخرج للحذف:", keyToDelete);

        if (!keyToDelete) {
            console.log("No file key found");
            return { error: "No file key found" };
        }

        // 3. محاولة الحذف الفعلي
        console.log("Uploadthing will delete file...");
        const response = await utapi.deleteFiles(keyToDelete);
        console.log("response:", response);

        // 4. تحديث القاعدة
        if (id && id !== "undefined") {
            await prisma.course.update({
                where: { id },
                data: { imageUrl: null },
            });
            console.log("Updated database successfully");
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error during execution:", error.message);
        return { error: error.message };
    }
};
