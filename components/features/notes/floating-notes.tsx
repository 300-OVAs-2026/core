import { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import { useNotesStore } from './store/notesStore';
import type { FloatingNotesProps } from './types/types';
import { CloseIcon, MoveArrowIcon, NewNoteIcon, NotesIcon } from './notes-icons';
import { NotesList } from './notes-list';
import { RichTextEditor } from './rich-text-editor';
import { 
  useDraggablePosition, 
  useTextSelection, 
  useNotesEditor, 
  useFloatingPanel 
} from './hooks';

import css from './floating-notes.module.css';

export const FloatingNotes: React.FC<FloatingNotesProps> = ({ currentPage = '/' }) => {
  const dragRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const hasInitialFocusRef = useRef(false);

  // Custom hooks
  const { position, handleDrag, resetPosition } = useDraggablePosition();
  const { isOpen, setIsOpen, setIsMinimized, isMinimized, toggleOpen } = useFloatingPanel();
  const {
    view,
    currentNoteId,
    noteTitle,
    noteContent,
    capturedText,
    setNoteTitle,
    setNoteContent,
    handleNewNote,
    handleSelectNote,
    handleSaveNote,
    handleBackToList,
    handleCaptureText: onCaptureText,
  } = useNotesEditor();

  const { showTooltip, tooltipPosition, handleCaptureText } = useTextSelection({
    containerRef,
    onCapture: (text) => {
      onCaptureText(text);
      setIsOpen(true);
      setIsMinimized(false);
    },
  });

  const { getAllNotes, deleteNote, setCurrentPage, getCurrentPageNotesCount } = useNotesStore();
  const notes = getAllNotes();
  const notesCount = getCurrentPageNotesCount();

  // Actualizar la página actual cuando cambia
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  // Manejar apertura/cierre y gestión de foco
  const handleToggleOpen = () => {
    if (isOpen) {
      // Al cerrar, devolver el foco al botón trigger y resetear el flag
      triggerButtonRef.current?.focus();
      hasInitialFocusRef.current = false;
    }
    
    toggleOpen();
    
    if (!isOpen) {
      resetPosition();
    }
  };
  // Focus trap
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    
    const getFocusableElements = () => {
      return container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])'
      );
    };

    // Enfocar el primer elemento enfocable al abrir solo una vez
    if (!hasInitialFocusRef.current) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        setTimeout(() => focusableElements[0]?.focus(), 100);
      }
      hasInitialFocusRef.current = true;
    }

    // Manejar el Tab para atrapar el foco y ESC para cerrar
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cerrar con ESC
      if (e.key === 'Escape') {
        e.preventDefault();
        handleToggleOpen();
        return;
      }

      // Atrapar el foco con Tab
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Resetear el flag cuando se cierra el panel
      if (!isOpen) {
        hasInitialFocusRef.current = false;
      }
    };
  }, [isOpen, view, notes.length, handleToggleOpen]);


  return (
    <>
      {/* Tooltip para capturar texto */}
      {showTooltip && (
        <div
          className={css['fn-selection-tooltip']}
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateX(-50%)',
            zIndex: 10000
          }}>
          <button
            type="button"
            className={css['fn-tooltip-capture-btn']}
            onClick={handleCaptureText}
            title="Capturar texto">
            <NotesIcon />
          </button>
        </div>
      )}

    <div className={css['fn-notes-container']}>
      {/* Botón flotante para abrir/cerrar */}
      <button
        ref={triggerButtonRef}
        type="button"
        className={css['fn-floating-trigger']}
        onClick={handleToggleOpen}
        disabled={isOpen}
        aria-label={isOpen ? 'Cerrar notas' : 'Abrir notas'}
        title={isOpen ? 'Cerrar notas' : 'Abrir notas'}>
       <NotesIcon width={32} height={32} />
       {notesCount > 0 && (
         <span className={css['fn-notes-badge']}>{notesCount}</span>
       )}
      </button>

      {/* Panel de notas flotante */}
      <Draggable
        handle=".js-c-notes-draggable"
        nodeRef={dragRef}
        position={position}
        onDrag={handleDrag}
      >
        <div ref={dragRef}>
          {isOpen && (
            <div
              ref={containerRef}
              className={css['fn-floating-notes']}
            >
          
          {/* Header con controles */}
          <div className={css['fn-floating-header']}>
            {view === 'list' && (
              <button
                type="button"
                className={css['fn-btn-new-note']}
                onClick={handleNewNote}
                aria-label="Nueva nota">
                
                  <NewNoteIcon fill={'#1f2937'} width={24} height={24} />
                
                <span>Nueva nota</span>
              </button>
            )}
            {view === 'editor' && (
              <span className={css['fn-floating-title']}>
                {currentNoteId ? 'Editar Nota' : 'Nueva Nota'}
              </span>
            )}
            <div className={css['fn-header-controls']}>
              <button
                type='button'
                className={`${css['fn-btn-control']} ${css['fn-btn-grab']} js-c-notes-draggable`}
                aria-label="Mover ventana de notas"
                title="Arrastra para mover">
                <MoveArrowIcon fill={'#1f2937'} width={28} height={28} />
              </button>
              
              <button
                type="button"
                className={css['fn-btn-control']}
                onClick={handleToggleOpen}
                aria-label="Cerrar ventana de notas"
                title='Cerrar notas'>
                <CloseIcon fill={'#1f2937'} width={28} height={28}/>
              </button>
            </div>
          </div>

          {/* Contenido */}
          {!isMinimized && (
            <div className={css['fn-floating-content']}>
              {view === 'list' ? (
                <NotesList
                  notes={notes}
                  onSelectNote={handleSelectNote}
                  onDeleteNote={deleteNote}
                  onNewNote={handleNewNote}
                />
              ) : (
                <div className={css['fn-editor-view']}>
                  {capturedText && (
                    <div className={css['fn-selected-text-preview']}>
                      <strong>Texto seleccionado:</strong>
                      <blockquote>
                      <p>"{capturedText}"</p>
                      </blockquote>
                    </div>
                  )}
                  
                  <input
                    type="text"
                    className={css['fn-note-title-input']}
                    placeholder="Título de la nota..."
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                  />

                  <RichTextEditor
                    content={noteContent}
                    onChange={setNoteContent}
                    placeholder="Escribe tu nota aquí..."
                  />

                  <div className={css['fn-editor-actions']}>
                    <button
                      type="button"
                      className={css['fn-btn--cancel-note']}
                      onClick={handleBackToList}>
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className={css['fn-btn--save-note']}
                      onClick={handleSaveNote}>
                      Guardar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
        </div>
      </Draggable>
    </div>
    </>
  );
};