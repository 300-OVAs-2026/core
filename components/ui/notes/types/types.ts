import type { JSONContent } from '@tiptap/react';

/**
 * Representa una nota individual en el sistema
 */
export interface Note {
  id: string;
  title: string;
  content: JSONContent;
  timestamp: number;
  selectedText?: string;
}

/**
 * Estado del store de notas
 */
export interface NotesState {
  globalNotes: Note[];
  pageNotes: Record<string, Note[]>;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  addNote: (note: Omit<Note, 'id' | 'timestamp'>, isGlobal?: boolean) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'timestamp'>>, isGlobal?: boolean) => void;
  deleteNote: (id: string, isGlobal?: boolean) => void;
  getNoteById: (id: string, isGlobal?: boolean) => Note | undefined;
  getCurrentPageNotes: () => Note[];
  getAllNotes: () => Note[];
  getCurrentPageNotesCount: () => number;
}

/**
 * Props para el componente FloatingNotes
 */
export interface FloatingNotesProps {
  initialPosition?: { x: number; y: number };
  currentPage?: string;
}

/**
 * Props para el componente RichTextEditor
 */
export interface RichTextEditorProps {
  content: JSONContent;
  onChange: (content: JSONContent) => void;
  placeholder?: string;
}

/**
 * Props para el componente NotesList
 */
export interface NotesListProps {
  notes: Note[];
  onSelectNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onNewNote: () => void;
}

/**
 * Posición del componente flotante
 */
export interface Position {
  x: number;
  y: number;
}
