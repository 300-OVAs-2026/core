import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Note, NotesState } from '../types/types';

/**
 * Store de Zustand para gestionar el estado de las notas.
 * Soporta notas globales y notas específicas por página.
 * Utiliza el middleware persist para guardar en localStorage.
 */
export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      globalNotes: [],
      pageNotes: {},
      currentPage: '/',

      /**
       * Establece la página actual
       * @param page - Path de la página
       */
      setCurrentPage: (page) => {
        set({ currentPage: page });
      },

      /**
       * Agrega una nueva nota al store
       * @param note - Datos de la nota sin id ni timestamp
       * @param isGlobal - Si es true, la nota es global; si es false, es de la página actual
       */
      addNote: (note, isGlobal = false) => {
        const newNote: Note = {
          ...note,
          id: crypto.randomUUID(),
          timestamp: Date.now()
        };

        if (isGlobal) {
          set((state) => ({
            globalNotes: [newNote, ...state.globalNotes]
          }));
        } else {
          const currentPage = get().currentPage;
          set((state) => ({
            pageNotes: {
              ...state.pageNotes,
              [currentPage]: [newNote, ...(state.pageNotes[currentPage] || [])]
            }
          }));
        }
      },

      /**
       * Actualiza una nota existente
       * @param id - ID de la nota a actualizar
       * @param updates - Campos a actualizar
       * @param isGlobal - Si es true, busca en notas globales; si es false, en la página actual
       */
      updateNote: (id, updates, isGlobal = false) => {
        if (isGlobal) {
          set((state) => ({
            globalNotes: state.globalNotes.map((note) =>
              note.id === id ? { ...note, ...updates, timestamp: Date.now() } : note
            )
          }));
        } else {
          const currentPage = get().currentPage;
          set((state) => ({
            pageNotes: {
              ...state.pageNotes,
              [currentPage]: (state.pageNotes[currentPage] || []).map((note) =>
                note.id === id ? { ...note, ...updates, timestamp: Date.now() } : note
              )
            }
          }));
        }
      },

      /**
       * Elimina una nota del store
       * @param id - ID de la nota a eliminar
       * @param isGlobal - Si es true, elimina de notas globales; si es false, de la página actual
       */
      deleteNote: (id, isGlobal = false) => {
        if (isGlobal) {
          set((state) => ({
            globalNotes: state.globalNotes.filter((note) => note.id !== id)
          }));
        } else {
          const currentPage = get().currentPage;
          set((state) => ({
            pageNotes: {
              ...state.pageNotes,
              [currentPage]: (state.pageNotes[currentPage] || []).filter((note) => note.id !== id)
            }
          }));
        }
      },

      /**
       * Obtiene una nota por su ID
       * @param id - ID de la nota
       * @param isGlobal - Si es true, busca en notas globales; si es false, en la página actual
       * @returns La nota encontrada o undefined
       */
      getNoteById: (id, isGlobal = false) => {
        if (isGlobal) {
          return get().globalNotes.find((note) => note.id === id);
        } else {
          const currentPage = get().currentPage;
          return (get().pageNotes[currentPage] || []).find((note) => note.id === id);
        }
      },

      /**
       * Obtiene todas las notas de la página actual
       * @returns Array de notas de la página actual
       */
      getCurrentPageNotes: () => {
        const currentPage = get().currentPage;
        return get().pageNotes[currentPage] || [];
      },

      /**
       * Obtiene todas las notas (globales + página actual) ordenadas por timestamp
       * @returns Array combinado de notas
       */
      getAllNotes: () => {
        const currentPage = get().currentPage;
        const pageNotes = get().pageNotes[currentPage] || [];
        const allNotes = [...get().globalNotes, ...pageNotes];
        return allNotes.sort((a, b) => b.timestamp - a.timestamp);
      },

      /**
       * Obtiene el conteo de notas de la página actual
       * @returns Número de notas en la página actual
       */
      getCurrentPageNotesCount: () => {
        const currentPage = get().currentPage;
        const pageNotes = get().pageNotes[currentPage] || [];
        return pageNotes.length;
      }
    }),
    {
      name: 'ova-notes-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
