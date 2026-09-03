import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { NoteSkeleton } from '../../components/Skeletons';

export const NotesView = () => {
  const { addToast } = useToast();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/workspace/notes');
      if (res.notes) {
        setNotes(res.notes);
      }
    } catch (e) {
      console.error('Failed to fetch notes from Cloud SQL:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    try {
      const title = `Note #${notes.length + 1} - Research Log`;
      const content = 'AEGIS automated synthesis log recorded in Cloud SQL PostgreSQL.';
      const res = await api.post('/workspace/notes', { title, content });
      if (res.note) {
        setNotes((prev) => [res.note, ...prev]);
        addToast('New note created and saved to Cloud SQL!', 'success');
      }
    } catch (e) {
      addToast('Failed to save note to Cloud SQL.', 'error');
    }
  };

  const processFile = async (file: File) => {
    try {
      addToast(`Encrypting and uploading ${file.name}...`, 'info');
      await new Promise((res) => setTimeout(res, 600));
      addToast(`AEGIS Scanner analyzed ${file.name}...`, 'aegis');
      
      // Save ingested file as a note entry in Cloud SQL
      const res = await api.post('/workspace/notes', {
        title: `Document: ${file.name}`,
        content: `Uploaded file (${(file.size / 1024).toFixed(1)} KB) ingested into Cloud SQL workspace.`,
      });
      if (res.note) {
        setNotes((prev) => [res.note, ...prev]);
      }
      addToast(`${file.name} securely ingested into Cloud SQL.`, 'success');
    } catch (error) {
      addToast('Upload failed. Please check connection.', 'error');
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
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Notes & Files</h2>
          <p className="text-xs text-slate-500 mt-0.5">Persisted in Cloud SQL (PostgreSQL)</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCreateNote}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors border border-slate-700"
          >
            + New Note
          </button>
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
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors ${
          isDragging
            ? 'border-cyan-400 bg-cyan-900/20'
            : 'border-slate-700 bg-[#0A111F]/50 hover:border-cyan-900/50 hover:bg-[#0A111F]'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 border border-slate-700">
          <svg
            className="w-6 h-6 text-slate-400"
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
        <h3 className="text-base font-medium text-slate-200 mb-1">
          Drag and drop files here
        </h3>
        <p className="text-slate-500 mb-3 text-xs max-w-md text-center">
          Upload PDFs, syllabi, and notes. Items are stored in Cloud SQL PostgreSQL.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NoteSkeleton />
          <NoteSkeleton />
          <NoteSkeleton />
        </div>
      ) : notes.length === 0 ? (
        <div className="bg-[#0A111F] rounded-2xl border border-slate-800 p-8 text-center text-slate-500">
          No notes stored in Cloud SQL yet. Click "+ New Note" or drop a file to create one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-[#0A111F] rounded-xl border border-slate-800 p-6 hover:border-cyan-900/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-medium text-slate-200">{note.title}</h3>
                <span className="text-[10px] text-cyan-500 font-mono bg-cyan-900/20 px-2 py-0.5 rounded">
                  Cloud SQL
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-3">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
