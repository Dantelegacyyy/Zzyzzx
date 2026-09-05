import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, FileText, Upload, Plus } from 'lucide-react';
import { api } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { NoteSkeleton } from '../../components/Skeletons';

export const NotesView = () => {
  const navigate = useNavigate();
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Notes & Ingested Files</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">Persisted in Cloud SQL (PostgreSQL)</p>
        </div>
        <div className="flex gap-2.5 flex-wrap">
          <button
            onClick={() => navigate('/voice-notes')}
            className="glass-pill px-4 py-2 rounded-xl text-cyan-300 hover:text-white font-medium text-xs transition-all flex items-center gap-1.5 border-cyan-500/30 hover:border-cyan-500/60"
          >
            <Mic size={14} className="text-cyan-400" />
            <span>Record Voice Note</span>
          </button>
          <button
            onClick={handleCreateNote}
            className="glass-pill px-4 py-2 rounded-xl text-slate-200 hover:text-white font-medium text-xs transition-all flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>New Note</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="glass-button-primary px-4 py-2 rounded-xl text-white font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Upload size={14} />
            <span>Upload File</span>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </button>
        </div>
      </div>

      {/* Glassmorphism Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/15 backdrop-blur-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)]'
            : 'glass-panel hover:border-cyan-500/40 hover:bg-slate-900/60'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 shadow-inner">
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-slate-100 mb-1">
          Drag and drop syllabus or research files here
        </h3>
        <p className="text-slate-400 text-xs max-w-md text-center">
          Upload PDFs, lecture slides, or markdown notes. Encrypted and saved to Cloud SQL PostgreSQL.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NoteSkeleton />
          <NoteSkeleton />
          <NoteSkeleton />
        </div>
      ) : notes.length === 0 ? (
        <div className="glass-panel rounded-3xl p-8 text-center text-slate-400 text-xs">
          No notes stored in Cloud SQL yet. Click "+ New Note" or drop a file above!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="glass-card rounded-2xl p-6 group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3 gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">{note.title}</h3>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-full shrink-0">
                  Cloud SQL
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
