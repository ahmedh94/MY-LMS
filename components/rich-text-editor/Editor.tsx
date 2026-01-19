"use client"

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";

export function Editor() {
    const editor = useEditor({
        extensions: [StarterKit, TextAlign.configure({
            types: ["paragraph", "heading"],
        })],
        immediatelyRender: false,

        editorProps: {
            attributes: {
                class: "min-h-[200px] p-5 prose prose-sm"
            }
        }
    });

    return (
        <div className="w-full border border-input rounded-lg shadow-sm overflow-hidden dark:bg-input/30">
            <Menubar editor={editor} />
            <EditorContent editor={editor} />
            </div>
    );
}