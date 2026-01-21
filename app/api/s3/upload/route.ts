import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import z from "zod";
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";

export const fileUploadSchema = z.object({
    fileName: z.string().min(1, {message: "File name is required"}),
    contentType: z.string().min(1, {message: "File type is required"}),
    size: z.number().min(1, {message: "File size is required"}),
    isImage: z.boolean(),
})
export async function POST(req: Request) {

    try {
        const body = await req.json();    

        const validatedBody = fileUploadSchema.safeParse(body);

        if(!validatedBody.success) {
            return NextResponse.json({error: "Invalid request"}, {status: 400});
        }

        const {fileName, contentType, size, isImage} = validatedBody.data;

        const uniqueKey = `${uuidv4()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMGES,
            Key: uniqueKey,
            ContentType: contentType,
            ContentLength: size,
            Metadata: {
                "is-image": isImage.toString(),
            },
        })

        const presignedUrl = await getSignedUrl(S3, command, { 
            expiresIn: 360, //URL expires in 6 minutes
        });

        const response = {
            presignedUrl,
            key: uniqueKey,
        }

        return NextResponse.json(response);

    } catch {
        return NextResponse.json({error: "Failed to generate presigned URL"}, {status: 500});
    }   
}