/**
 * ImageUpload — Drag-and-drop image/video upload component for admin dashboard.
 * Uploads files to S3 via the tRPC upload.image endpoint.
 */
import { useState, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { Upload, X, Image as ImageIcon, Film, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
  accept?: string;
  aspectHint?: string; // e.g. "16:9", "4:3", "square"
}

export default function ImageUpload({
  currentUrl,
  onUpload,
  label = "Image",
  accept = "image/*,video/mp4,video/webm",
  aspectHint,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState("");
  const [showManual, setShowManual] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.upload.image.useMutation({
    onError: () => toast.error("Upload failed. Please try again."),
  });

  const isVideo = (url: string) => {
    return /\.(mp4|webm|mov|avi)$/i.test(url) || url.includes("video");
  };

  const handleFile = useCallback(async (file: File) => {
    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 20MB.");
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      // Convert to base64 for upload
      const buffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );

      const result = await uploadMutation.mutateAsync({
        base64,
        filename: file.name,
        contentType: file.type || "image/jpeg",
      });

      onUpload(result.url);
      toast.success("File uploaded successfully!");
    } catch (err) {
      setPreview(null);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [onUpload, uploadMutation]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleManualUrl = () => {
    if (manualUrl.trim()) {
      onUpload(manualUrl.trim());
      setManualUrl("");
      setShowManual(false);
      toast.success("URL updated!");
    }
  };

  const handleRemove = () => {
    onUpload("");
    setPreview(null);
  };

  const displayUrl = preview || currentUrl;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-white/60 text-xs uppercase tracking-wide font-medium">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowManual(!showManual)}
          className="text-white/30 text-xs hover:text-white/60 transition-colors"
        >
          {showManual ? "Upload file" : "Paste URL instead"}
        </button>
      </div>

      {showManual ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30"
          />
          <button
            type="button"
            onClick={handleManualUrl}
            className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors"
          >
            Set
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all duration-200
            ${isDragging ? "border-white/40 bg-white/10" : "border-white/10 hover:border-white/20 bg-white/5"}
            ${isUploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          {displayUrl ? (
            <div className="relative group">
              {isVideo(displayUrl) ? (
                <div className="aspect-video bg-black/20 relative">
                  {displayUrl.startsWith("data:") ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film size={40} className="text-white/30" />
                      <p className="text-white/40 text-xs ml-2">Video preview uploading...</p>
                    </div>
                  ) : (
                    <video
                      src={displayUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      loop
                      autoPlay
                      onError={(e) => {
                        // Fallback to icon if video can't load
                        (e.target as HTMLVideoElement).style.display = 'none';
                        const parent = (e.target as HTMLVideoElement).parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-white/40 text-xs">Video: ' + displayUrl.split('/').pop() + '</p></div>';
                        }
                      }}
                    />
                  )}
                </div>
              ) : (
                <img
                  src={displayUrl}
                  alt={label}
                  className="w-full aspect-video object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Upload size={16} />
                  <span>Replace</span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white/80 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="aspect-video flex flex-col items-center justify-center gap-3 py-8">
              {isUploading ? (
                <>
                  <Loader2 size={24} className="text-white/40 animate-spin" />
                  <p className="text-white/40 text-sm">Uploading...</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <ImageIcon size={20} className="text-white/30" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/50 text-sm">
                      Drag & drop or <span className="text-white/70 underline">click to browse</span>
                    </p>
                    <p className="text-white/25 text-xs mt-1">
                      JPG, PNG, WebP, MP4 — Max 20MB
                      {aspectHint && ` — Recommended: ${aspectHint}`}
                    </p>
                    {accept?.includes("video") && (
                      <p className="text-white/20 text-[10px] mt-1">
                        For large videos, use "Paste URL instead" above
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {currentUrl && !showManual && (
        <p className="text-white/20 text-[10px] truncate" title={currentUrl}>
          {currentUrl}
        </p>
      )}
    </div>
  );
}
