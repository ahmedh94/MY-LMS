"use client"

import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { RenderError, RenderState } from './RenderState';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface UploadProps {
    id: string | null;
    file: File | null;
    uploding: boolean;
    progress: number;
    key?: string;
    isDeleting: boolean;
    error: boolean;
    objectUrl?: string;
    fileType: "image" | "video";
}

export function Upload() {

    const [fileKey, setFileKey] = useState<UploadProps>({
        id: null,
        file: null,
        uploding: false,
        progress: 0,
        key: undefined,
        isDeleting: false,
        error: false,
        fileType: "image",
    });

    async function uploadFile(file: File) {
        setFileKey((prev)=> ({
            ...prev,
            uploding: true,
            progress: 0,
        }));

        try {
            //1. Get presigned URL 
            const presignedResponse = await fetch("/api/s3/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                   // isImage: file.type.startsWith("image/"),
                   isImage: true,
                }),
            });

            if(!presignedResponse.ok){
                toast.error("Failed to get presigned URL ");
                setFileKey((prev) => ({
                    ...prev,
                    uploding: false,
                    progress: 0,
                    error: true,
                }));
                return;
            }

            const { presignedUrl, key } = await presignedResponse.json();

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                
                xhr.upload.onprogress = (event) => {
                    if(event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        setFileKey((prev) => ({
                            ...prev,
                            progress,
                        }));
                    }
                }

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        setFileKey((prev) => ({
                            ...prev,
                            progress: 100,
                            uploding: false,
                            key: key,
                        }));

                        toast.success("File uploaded successfully");
                        resolve();
                    } else {
                        reject(new Error("Upload Failed ...."));
                    }

                    xhr.onerror = () => {
                        reject(new Error("Upload Failed ...."));
                    };

                    xhr.open("PUT", presignedUrl);
                    xhr.setRequestHeader("Content-Type", file.type);
                    xhr.send(file);
                }
            })

        } catch {
            toast.error("Failed to upload file");

            setFileKey((prev) => ({
                ...prev,
                uploding: false,
                progress: 0,
                error: true,
            }));

        }
        
    }

    const onDrop = useCallback((acceptedFiles: File[])=> {

        if(acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFileKey({
                file: file,
                uploding: false,
                progress: 0,
                objectUrl: URL.createObjectURL(file),
                error: false,
                id: uuidv4(),
                fileType: "image",
                isDeleting: false,
            });

            uploadFile(file);
        }
  }, [])

  function rejectedFiles(fileRejection: FileRejection[]) {
    if(fileRejection.length) {
        const tooManyFiles = fileRejection.find((rejection) => rejection.errors[0].code === "too-many-files");

         const tooLargeFile = fileRejection.find((rejection) => rejection.errors[0].code === "file-too-large");

        if(tooLargeFile) {
            toast.error("Too large file", {
                description: "File size must be less than 5MB",
            })
        }
        
        if(tooManyFiles) {
            toast.error("Too many files", {
                description: "You can only upload one file at a time",
            })
        }

       
    }
  }

    function renderContent() {
        if(fileKey.uploding){
            return <h1>uploding....</h1>;
        }

        if(fileKey.error){
            return <RenderError error="Failed to upload file" />;
        }

        if(fileKey.objectUrl) {
            return <h1>Uploaded File</h1>;
        }

        return <RenderEmptyStateds isDragActive={isDragActive} />
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: { "image/*": []},
        maxSize: 5 * 1024 * 1024,
        multiple: false,
        maxFiles: 1,
        onDropRejected: rejectedFiles,
    })

    return (
        <Card {...getRootProps()}
         className={cn("relative border-dashed border-2 transition-colors duration-300 hover:border-primary ease-in-out w-full h-50 text-center", 
            isDragActive ? "border-primary bg-primary/10 border-solid" : "border-border hover:border-primary")}>

        <CardContent className="flex items-center justify-center h-full w-full p-4">
            <input {...getInputProps()} />
            <RenderState isDragActive={isDragActive} />
        </CardContent>
    </Card>
    );
}

