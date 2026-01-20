import { cn } from "@/lib/utils";
import { CloudUploadIcon } from "lucide-react";

export function RenderState({ isDragActive}: {isDragActive: boolean}) {
    return (
        <div className="text-center ">
            <div className="flex items-center justify-center size-12 rounded-full">
                <CloudUploadIcon className={cn("size-8 text-muted-foreground", isDragActive && "text-primary")} />
            </div>
            <p className="text-base text-muted-foreground">
                Drag and drop files here or 
                <span className="text-primary font-semibold cursor-pointer ml-2">
                     click to upload</span>
            </p>
        </div>
    )
}