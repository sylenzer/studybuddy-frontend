import React, { useState } from "react";
import Tesseract from "tesseract.js";
import ReactMarkdown from "react-markdown";
import LoaderCube from "../components/LoaderCube";

const OCRUpload = ({ setInput, handleSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setOcrError("");
    setOcrLoading(true);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        const markdown = `## Extracted from Image\n${text.trim()}`;
        setExtractedText(markdown);
        setOcrLoading(false);
      })
      .catch((err) => {
        console.error("OCR Error:", err);
        setOcrError("❌ Failed to extract text from image. Try a clearer photo.");
        setOcrLoading(false);
      });
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setExtractedText("");
    setOcrError("");
  };

  return (
    <div className="mt-6 text-center">
      <input
        type="file"
        accept="image/*"
        id="photoUpload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="photoUpload"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
      >
        Upload Photo
      </label>

      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-xs rounded shadow mx-auto"
          />
          <button
            className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={clearImage}
          >
            Clear Image
          </button>
        </div>
      )}

      {ocrLoading && (
        <div className="py-6">
          <LoaderCube />
          <p className="text-sm text-muted-foreground mt-2">Scanning image for text...</p>
        </div>
      )}

      {ocrError && (
        <div className="mt-4 text-red-500 font-medium">
          {ocrError}
        </div>
      )}

      {extractedText && !ocrLoading && (
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            Extracted Text (Preview)
          </h3>
          <ReactMarkdown className="prose dark:prose-invert">{extractedText}</ReactMarkdown>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={async () => {
                setInput(extractedText);
                const fakeEvent = { preventDefault: () => {} };
                await handleSubmit(fakeEvent);
              }}
            >
              Use This & Solve
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => {
                const plainText = extractedText.replace(/^##.*\n/, "");
                setInput(plainText);
                setExtractedText("");
                document.querySelector("textarea")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Edit First
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRUpload;
