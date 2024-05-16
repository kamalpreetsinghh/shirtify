"use client";

import { IFilePicker } from "@/lib/types";

const FilePicker = ({ file, setFile, readFile }: IFilePicker) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          className="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file ? file.name : "No file selected"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          className="flex-1 rounded-button-primary-color"
          onClick={() => readFile("logoImage")}
        >
          Logo
        </button>
        <button
          className="flex-1 rounded-button-primary-color"
          onClick={() => readFile("fullImage")}
        >
          Full
        </button>
      </div>
    </div>
  );
};

export default FilePicker;
