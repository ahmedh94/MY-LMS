"use client"

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";

import { useRef, useMemo } from "react";

export function Editor({ field }: { field: any }) {
    const extensions = useMemo(() => [
        StarterKit,
        TextAlign.configure({
            types: ["paragraph", "heading"],
        })
    ], []);

    const editor = useEditor({
        extensions,
        immediatelyRender: false,

        editorProps: {
            attributes: {
                class: "min-h-[200px] p-5 prose prose-sm focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert"
            }
        },

        onUpdate: ({ editor }) => {
            field.onChange(JSON.stringify(editor.getJSON()));
        },

        content: field.value ? JSON.parse(field.value) : "",
    });

    return (
        <div className="w-full border border-input rounded-lg shadow-sm overflow-hidden dark:bg-input/30">
            <Menubar editor={editor} />
            <EditorContent editor={editor} />
            </div>
    );
}