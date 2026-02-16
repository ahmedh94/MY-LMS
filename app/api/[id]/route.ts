import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const utapi = new UTApi();
    await utapi.deleteFiles(id);
    return NextResponse.json({ success: true });
}

