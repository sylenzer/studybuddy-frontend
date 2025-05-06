// components/ImageUpload.jsx
import React, { useRef } from "react";

const ImageUpload = ({ onTextExtracted }) => {
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.text) {
        onTextExtracted(data.text);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  return (
    <div className="mb-4 border-2 border-dashed border-primary p-4 rounded-xl text-center">
      <p className="mb-2 text-muted-foreground">
        Upload a photo of your math problem
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        type="button"
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        onClick={() => fileInputRef.current.click()}
      >
        Upload Photo
      </button>
    </div>
  );
};

export default ImageUpload;
