import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { prisma } from "@/lib/db";

const utapi = new UTApi();
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    try {
        const upload = await prisma.upload.findUnique({
            where: { id: params.id },
        });
        if (!upload) return NextResponse.json({ error: "Upload not found" }, { status: 404 });

        await utapi.deleteFiles(upload.fileKey);
        await prisma.upload.delete({ where: { id: params.id } });
        return NextResponse.json({ id: params.id });
    } catch {
        return NextResponse.json({ error: "Failed to delete upload" }, { status: 500 });
    }


}