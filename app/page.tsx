'use client';

import { useState, useEffect } from 'react';
import NoteForm from '@/components/NoteForm';
import NoteItem, { NoteData } from '@/components/NoteItem';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, PenTool } from 'lucide-react';

export default function Home() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [editingNote, setEditingNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      if (data.success) {
        setNotes(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch notes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateOrUpdate = async (note: { title: string; content: string }) => {
    try {
      if (editingNote) {
        // Update
        const res = await fetch(`/api/notes/${editingNote._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });
        const data = await res.json();
        if (data.success) {
          setNotes((prev) =>
            prev.map((n) => (n._id === editingNote._id ? data.data : n))
          );
          setEditingNote(null);
        }
      } else {
        // Create
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });
        const data = await res.json();
        if (data.success) {
          setNotes((prev) => [data.data, ...prev]);
        }
      }
    } catch (error) {
      console.error('Operation failed', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setNotes((prev) => prev.filter((n) => n._id !== id));
      }
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      <header className="mb-16 text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-4"
        >
          <Sparkles className="w-3 h-3" />
          <span>roshan7783</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter"
        >
          Notes.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed"
        >
          Capture your thoughts in style. Simple, modern, and persistent.
        </motion.p>
      </header>

      <NoteForm
        key={editingNote ? editingNote._id : 'create'}
        onSubmit={handleCreateOrUpdate}
        initialData={editingNote}
        onCancel={() => setEditingNote(null)}
      />

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-white animate-spin"></div>
          </div>
        </div>
      ) : notes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-3xl border border-dashed border-white/10"
        >
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-500">
            <PenTool className="w-8 h-8" />
          </div>
          <p className="text-gray-400 text-lg font-medium">Your canvas is empty.</p>
          <p className="text-gray-600 text-sm mt-2">Create your first memory.</p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {notes.map((note) => (
              <NoteItem
                key={note._id}
                note={note}
                onEdit={setEditingNote}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
}
