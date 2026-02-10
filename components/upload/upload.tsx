"use client";

import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing"; // تأكد من إنشاء هذا الملف كما فعلنا سابقاً
import { toast } from "sonner";
import { X, UploadCloud, Loader2 } from "lucide-react";
import { deleteImageAction } from "@/lib/course";

interface UploadProps {
  onChange: (url: string | null) => void;
  value?: string;
}

export function Upload({ onChange, value, id }: UploadProps & { id: string }) {
  const [imgUrl, setImgUrl] = useState(value || "");
  const [progress, setProgress] = useState(0);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res.length > 0) {
        // استخدم ufsUrl بدلاً من url لتفادي التحذيرات
        const url = res[0].ufsUrl || res[0].url;
        setImgUrl(url);
        onChange(url);
        setProgress(0); // إعادة تصغير شريط التحميل
        toast.success("UPLOADED");
      }
    },
    onUploadError: (error) => {
      toast.error(`ERROR: ${error.message}`);
      setProgress(0);
    },
    onUploadProgress: (p) => {
      setProgress(p); // هنا يتم تحديث النسبة المئوية
    },
  });

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    const res = await fetch(`/api/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setImgUrl("");
      onChange("");
      toast.success("DELETED");
    } else {
      toast.error("Failed to delete image");
    }
  };

  // 1. عرض الصورة بعد الرفع
  if (imgUrl) {
    return (
      <div className="relative w-full mx-auto h-64 border-2 pl-20 pt-3 border-dashed border-gray-200 rounded-2xl overflow-hidden hover:border-[#22c55e] group">

        <Image src={imgUrl} alt="Preview" className="object-cover rounded-2xl relative" width={400} height={300} />

        <button
          onClick={handleDelete}
          className="absolute top-5 left-65 z-50 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  // 2. عرض واجهة الرفع مع نسبة التحميل
  return (
    <div
      className={`
        flex items-center justify-center w-full border-2 border-dashed rounded-2xl p-10 transition-all flex flex-col items-center justify-center cursor-pointer
        ${isUploading ? "border-gray-300" : "border-gray-300 hover:border-[#22c55e]"}
      `}
      onClick={() => !isUploading && document.getElementById("file-upload")?.click()}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) startUpload([file]);
        }}
      />

      {isUploading ? (
        <div className="flex flex-col items-center w-full">
          <Loader2 className="h-10 w-10 text-[#22c55e] animate-spin mb-4" />
          <p className="text-sm font-medium text-[#22c55e] mb-2">Uploading... {progress}%</p>
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#22c55ee6] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-200 p-4 rounded-full mb-4">
            <UploadCloud className="h-8 w-8 text-[#22c55ee6]" />
          </div>
          <p className="text-sm font-semibold text-gray-500">Choose Image</p>
        </>
      )}
    </div>
  );
}