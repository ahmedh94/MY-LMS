import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

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

export const ourFileRouter = {
  // هنا نسمي الـ endpoint "imageUploader"
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // 1. التحقق من الجلسة
      const session = await requireAdmin();

      // 2. حماية Arcjet
      const decision = await aj.protect(req, {
        fingerprint: session.user.id as string,
      });

      if (decision.isDenied()) {
        return {
          status: 'error',
          message: "Too many requests or bot detected"
        }
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;