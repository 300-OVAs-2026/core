import { useState } from 'react';
import type { JSONContent } from '@tiptap/react';
import { useNotesStore } from '../store/notesStore';

const INITIAL_CONTENT: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
};

type ViewType = 'list' | 'editor';

interface UseNotesEditorReturn {
  // Estados
  view: ViewType;
  currentNoteId: string | null;
  noteTitle: string;
  noteContent: JSONContent;
  capturedText: string;
  
  // Setters
  setNoteTitle: (title: string) => void;
  setNoteContent: (content: JSONContent) => void;
  
  // Acciones
  handleNewNote: () => void;
  handleSelectNote: (noteId: string) => void;
  handleSaveNote: () => void;
  handleBackToList: () => void;
  handleCaptureText: (text: string) => void;
}

/**
 * Hook para manejar la lógica del editor de notas.
 * Gestiona la creación, edición, guardado y navegación entre notas.
 */
export const useNotesEditor = (): UseNotesEditorReturn => {
  const [view, setView] = useState<ViewType>('list');
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState<JSONContent>(INITIAL_CONTENT);
  const [capturedText, setCapturedText] = useState('');

  const { addNote, updateNote, getNoteById } = useNotesStore();

  /**
   * Crea una nueva nota vacía
   */
  const handleNewNote = () => {
    setCurrentNoteId(null);
    setNoteTitle('');
    setNoteContent(INITIAL_CONTENT);
    setCapturedText('');
    setView('editor');
  };

  /**
   * Selecciona y carga una nota existente para edición
   */
  const handleSelectNote = (noteId: string) => {
    const note = getNoteById(noteId);
    if (note) {
      setCurrentNoteId(note.id);
      setNoteTitle(note.title);
      setNoteContent(note.content);
      setCapturedText(note.selectedText || '');
      setView('editor');
    }
  };

  /**
   * Guarda la nota actual (nueva o existente)
   */
  const handleSaveNote = () => {
    if (currentNoteId) {
      // Actualizar nota existente
      updateNote(currentNoteId, {
        title: noteTitle || 'Sin título',
        content: noteContent,
        selectedText: capturedText,
      });
    } else {
      // Crear nueva nota
      addNote({
        title: noteTitle || 'Sin título',
        content: noteContent,
        selectedText: capturedText,
      });
    }
    handleBackToList();
  };

  /**
   * Vuelve a la vista de lista
   */
  const handleBackToList = () => {
    setView('list');
    setCurrentNoteId(null);
    setNoteTitle('');
    setNoteContent(INITIAL_CONTENT);
    setCapturedText('');
  };

  /**
   * Captura texto seleccionado y abre el editor
   */
  const handleCaptureText = (text: string) => {
    setCapturedText(text);
    setNoteContent(INITIAL_CONTENT);
    setView('editor');
  };

  return {
    // Estados
    view,
    currentNoteId,
    noteTitle,
    noteContent,
    capturedText,
    
    // Setters
    setNoteTitle,
    setNoteContent,
    
    // Acciones
    handleNewNote,
    handleSelectNote,
    handleSaveNote,
    handleBackToList,
    handleCaptureText,
  };
};
