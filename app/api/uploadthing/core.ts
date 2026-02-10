import { createUploadthing, type FileRouter } from "uploadthing/next";
import { prisma } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  // هنا نسمي الـ endpoint "imageUploader"
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      // هذا الكود يعمل بعد نجاح الرفع
      await prisma.upload.create({
        data: {
          name: file.name,
          url: file.url,
          fileType: file.type,
          fileSize: file.size,
          fileKey: file.key,
        },
      });
      return { url: file.url, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;