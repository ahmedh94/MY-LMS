"use client"

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { RenderState } from './RenderState';

export function Upload() {

    const onDrop = useCallback((acceptedFiles: File[])=> {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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

