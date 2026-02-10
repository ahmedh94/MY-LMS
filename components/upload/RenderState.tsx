import { cn } from "@/lib/utils";
import { CloudOffIcon, CloudUploadIcon } from "lucide-react";
import { Button } from "../ui/button";

export function RenderState({ isDragActive}: {isDragActive: boolean}) {
    return (
        <div className="text-center ">
            <div className="flex items-center m-auto size-12 rounded-full">
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

export function RenderError({ error }: { error: string | undefined }) {
    return (
        <div className="text-center ">
            <div className="flex items-center m-auto size-12 rounded-full">
                <CloudOffIcon className={cn("size-8 text-destructive", error && "text-destructive")} />
            </div>
            <p className="text-base text-destructive">
                Please try again 
            </p>
            <Button className="mt-4" type="button">Retry</Button>
        </div>
    )
}