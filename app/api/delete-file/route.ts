// app/api/delete-file/route.ts
import { NextResponse } from "next/server";
import { utapi } from "@/lib/uploadthing-server"; // Adjust the import path as needed
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { requireAdmin } from "@/app/data/admin/require-admin";

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

export async function POST(request: Request) {
    const { fileKey } = await request.json();
    const session = await requireAdmin();

    const decision = await aj.protect(request, {
        fingerprint: session.user.id as string,
    });

    if (decision.isDenied()) {
        return {
            status: 'error',
            message: "Too many requests or bot detected"
        }
    }

    if (!fileKey) {
        return new NextResponse("File key is required", { status: 400 });
    }

    try {
        await utapi.deleteFiles(fileKey);
        // You should also delete the file record from your database here if applicable
        return NextResponse.json({ message: "File deleted" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to delete file", { status: 500 });
    }
}
