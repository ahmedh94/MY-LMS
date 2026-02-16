// app/api/delete-file/route.ts
import { NextResponse } from "next/server";
import { utapi } from "@/lib/uploadthing-server"; // Adjust the import path as needed

export async function POST(request: Request) {
    const { fileKey } = await request.json();

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
