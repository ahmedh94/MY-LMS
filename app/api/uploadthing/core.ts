import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

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
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await requireAdmin();

      if (!session || session.user.role !== "admin") {
        throw new UploadThingError("Unauthorized");
      }
      const decision = await aj.protect(req, {
        fingerprint: session.user.id,
      });

      if (decision.isDenied()) {
        throw new UploadThingError("Too many requests or bot detected");
        /*
        return {
          status: 'error',
          message: "Too many requests or bot detected"
        }
        */
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;