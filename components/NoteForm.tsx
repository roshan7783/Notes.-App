'use client';

import React, { useState } from 'react';
import { NoteData } from './NoteItem';
import { motion } from 'framer-motion';
import { Plus, X, Save } from 'lucide-react';

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string }) => void;
  initialData?: NoteData | null;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
    if (!initialData) {
        setTitle('');
        setContent('');
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit} 
      className="bg-white/5 backdrop-blur-2xl p-1 rounded-3xl border border-white/10 shadow-2xl mb-12 max-w-2xl mx-auto overflow-hidden ring-1 ring-white/5"
    >
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-transparent text-2xl md:text-3xl font-bold text-white placeholder-gray-600 focus:outline-none placeholder:font-bold"
            placeholder="Title..."
          />
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="ml-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="w-full bg-transparent text-base md:text-lg text-gray-300 placeholder-gray-600 focus:outline-none resize-none leading-relaxed"
          placeholder="Start typing your note here..."
        />
        
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            {initialData ? (
              <>
                <Save className="w-5 h-5" />
                <span>Update</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Create Note</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default NoteForm;
