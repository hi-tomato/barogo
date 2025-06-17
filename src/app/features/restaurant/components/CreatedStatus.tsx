import React from "react";

interface StatusMessageProps {
  type: "isUploading" | "uploading" | "success" | "error";
}

export default function CreatedStatus({ type }: StatusMessageProps) {
  const renderContents = () => {
    switch (type) {
      case "isUploading":
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-600">업로드 중...</span>
          </div>
        );

      case "uploading":
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        );

      case "success":
        return (
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        );

      case "error":
        return (
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
        );
    }
  };

  return <div className="text-center py-8">{renderContents()}</div>;
}
