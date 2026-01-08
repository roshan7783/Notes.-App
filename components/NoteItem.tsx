'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Calendar } from 'lucide-react';

export interface NoteData {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteItemProps {
  note: NoteData;
  onEdit: (note: NoteData) => void;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-colors duration-300"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold mb-3 text-white tracking-tight leading-snug">
          {note.title}
        </h3>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed whitespace-pre-wrap break-words flex-grow">
          {note.content}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-center text-xs text-gray-500 font-medium">
            <Calendar className="w-3 h-3 mr-1.5 opacity-70" />
            {new Date(note.createdAt).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(note)}
              className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteItem;
