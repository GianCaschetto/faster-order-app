"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  className?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  onDrop: (acceptedFiles: File[]) => void;
  disabled?: boolean;
  accept?: Record<string, string[]>;
  showPreview?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

export function Dropzone({
  className,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  onDrop,
  disabled = false,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
  showPreview = true,
  style,
  id,
  ...props
}: DropzoneProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        const newFiles =
          maxFiles === 1
            ? [acceptedFiles[0]]
            : [...files, ...acceptedFiles].slice(0, maxFiles);
        setFiles(newFiles);
        onDrop(newFiles);

        // Generate previews
        if (showPreview) {
          const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
          setPreviews((prev) => {
            // Revoke old preview URLs to avoid memory leaks
            prev.forEach((url) => URL.revokeObjectURL(url));
            return maxFiles === 1
              ? newPreviews
              : [...prev, ...newPreviews].slice(0, maxFiles);
          });
        }
      },
      maxFiles,
      maxSize,
      accept,
      disabled,
      multiple: maxFiles > 1,
    });

  // Clean up preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const removeFile = (index: number) => {
    setFiles((files) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      return newFiles;
    });

    if (showPreview) {
      setPreviews((previews) => {
        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        return newPreviews;
      });
    }
  };

  const hasErrors = fileRejections.length > 0;

  return (
    <div
      className={cn("space-y-4", className)}
      {...props}
      style={style}
      id={id}
    >
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 transition-colors",
          "hover:border-muted-foreground/50",
          isDragActive && "border-primary/50 bg-primary/5",
          hasErrors && "border-destructive/50 bg-destructive/5",
          disabled && "cursor-not-allowed opacity-60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <UploadCloud
            className={cn(
              "h-10 w-10",
              isDragActive ? "text-primary" : "text-muted-foreground"
            )}
          />

          <div className="space-y-1">
            <p className="text-sm font-medium">
              {isDragActive ? "Drop the files here" : "Drag & drop files here"}
            </p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
          </div>

          {maxFiles > 1 && (
            <p className="text-xs text-muted-foreground">
              Upload up to {maxFiles} files
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Max file size: {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      </div>

      {/* Error messages */}
      {fileRejections.length > 0 && (
        <div className="text-xs text-destructive space-y-1">
          {fileRejections.map(({ file, errors }, index) => (
            <div key={index} className="flex items-start gap-2">
              <X className="h-4 w-4 mt-0.5" />
              <div>
                <p className="font-medium">{file.name}</p>
                <ul className="list-disc list-inside pl-2">
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File previews */}
      {showPreview && previews.length > 0 && (
        <div
          className={cn(
            "grid gap-4",
            maxFiles > 1
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1"
          )}
        >
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-md overflow-hidden border"
            >
              <Image
                src={preview || "/placeholder.svg"}
                alt={files[index]?.name || "Preview"}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs truncate px-2 py-1">
                {files[index]?.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
