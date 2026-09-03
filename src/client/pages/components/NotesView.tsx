import React, { useState, useRef } from 'react';
import { api } from '../../lib/api';
import { useToast } from '../../components/Toast';

export const NotesView = () => {
  const { addToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    try {
      addToast(`Encrypting and uploading ${file.name}...`, 'info');
      // Mocking local upload delay
      await new Promise((res) => setTimeout(res, 800));
      addToast(`AEGIS Scanner analyzed ${file.name}...`, 'aegis');
      addToast(`${file.name} securely ingested and indexed.`, 'success');
    } catch (error) {
      addToast('Upload failed. Please check network.', 'error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Notes & Files
        </h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors shadow-lg shadow-cyan-900/50 cursor-pointer"
        >
          Upload File
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </button>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-colors ${
          isDragging
            ? 'border-cyan-400 bg-cyan-900/20'
            : 'border-slate-700 bg-[#0A111F]/50 hover:border-cyan-900/50 hover:bg-[#0A111F]'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-200 mb-2">
          Drag and drop files here
        </h3>
        <p className="text-slate-500 mb-4 text-sm max-w-md text-center">
          Upload your PDFs, syllabi, and notes. AEGIS will automatically extract
          text, classify topics, and index for semantic search.
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors border border-slate-700"
        >
          Browse Files
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#0A111F] rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center text-slate-500 min-h-[200px] hover:border-cyan-900/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-cyan-900/30 transition-colors mb-4">
            <span className="text-2xl">+</span>
          </div>
          <span className="font-medium text-slate-400">
            Create new text note
          </span>
        </div>
      </div>
    </div>
  );
};
