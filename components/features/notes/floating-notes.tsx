import { useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import { Icon } from '../../ui';

import { useDraggablePosition, useFloatingPanel, useNotesEditor, useTextSelection } from './hooks';
import { MoveArrowIcon, NewNoteIcon, NotesIcon } from './notes-icons';
import { NotesList } from './notes-list';
import { RichTextEditor } from './rich-text-editor';
import { useNotesStore } from './store/notesStore';

import type { FloatingNotesProps } from './types/types';

import css from './floating-notes.module.css';

export const FloatingNotes: React.FC<FloatingNotesProps> = ({ currentPage = '/' }) => {
  const dragRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const hasInitialFocusRef = useRef(false);
    const [hasToggled, setHasToggled] = useState(false);

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
    handleCaptureText: onCaptureText
  } = useNotesEditor();

  const { showTooltip, tooltipPosition, handleCaptureText } = useTextSelection({
    containerRef,
    onCapture: (text) => {
      onCaptureText(text);
      setIsOpen(true);
      setIsMinimized(false);
    }
  });

  const { getAllNotes, deleteNote, setCurrentPage, getCurrentPageNotesCount } = useNotesStore();
  const notes = getAllNotes();
  const notesCount = getCurrentPageNotesCount();

  // Actualizar la página actual cuando cambia
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    if (isOpen) setHasToggled(true);
  }, [isOpen]);

  // Manejar apertura/cierre y gestión de foco
  const handleToggleOpen = useCallback(() => {
    if (isOpen) {
      // Al cerrar, devolver el foco al botón trigger y resetear el flag
      triggerButtonRef.current?.focus();
      hasInitialFocusRef.current = false;
    }

    toggleOpen();

    if (!isOpen) {
      resetPosition();
    }
  }, [isOpen, toggleOpen, resetPosition]);
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
          className={`${css['fn-floating-trigger']} ${
            isOpen ? css['is-closing'] : hasToggled ? css['is-opening'] : ''
          }`}
          onClick={handleToggleOpen}
          disabled={isOpen}
          aria-label={isOpen ? 'Cerrar notas' : 'Abrir notas'}
          title={isOpen ? 'Cerrar notas' : 'Abrir notas'}>
          <svg xmlns="http://www.w3.org/2000/svg" className={css['fn-trigger-icon']} viewBox="0 0 400 400">
            <circle cx="200" className={css['fn-trigger-icon__dash']} cy="200" r="115" />
            <circle cx="200" cy="200" r="110" fill="var(--primary-700)" />
            <circle cx="200" cy="200" r="70" fill="var(--primary-500)" />
            <g className={css['fn-trigger-icon__shadow']} transform="translate(155, 155) scale(1.5)">
              <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M58.69 26.98v18.36c0 8.67-7.03 15.7-15.7 15.7H1V19.05c0-8.67 7.03-15.7 15.7-15.7h26.29"
              />
              <path
                fill="white"
                d="M62.9 14.1L27.5 49.51l-12.45 1.15 1.15-12.45L51.6 2.8C54.03.37 58.53.93 61.65 4.05c3.12 3.12 3.68 7.62 1.25 10.05z"
              />
            </g>
          </svg>
          {notesCount > 0 && <span className={css['fn-notes-badge']}>{notesCount}</span>}
          <span className={css['fn-trigger-text']}>Notas</span>
        </button>

        {/* Panel de notas flotante */}
        <Draggable handle=".js-c-notes-draggable" nodeRef={dragRef} position={position} onDrag={handleDrag}>
          <div ref={dragRef} style={{position: 'absolute'}}>
            {isOpen && (
              <div ref={containerRef} className={css['fn-floating-notes']}>
                {/* Header con controles */}
                <div
                  className={css['fn-floating-header']}
                  style={{
                    borderBottom: view === 'editor' ? '1px solid var(--notes-border-gray)' : 'none'
                  }}>
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
                    <span className={css['fn-floating-title']}>{currentNoteId ? 'Editar Nota' : 'Nueva Nota'}</span>
                  )}
                  <div className={css['fn-header-controls']}>
                    <button
                      type="button"
                      className={`${css['fn-btn-control']} ${css['fn-btn-grab']} js-c-notes-draggable`}
                      aria-label="Mover ventana de notas"
                      title="Arrastra para mover">
                      <MoveArrowIcon fill={'currentColor'} width={28} height={28} />
                    </button>

                    <button
                      type="button"
                      className={css['fn-btn-control']}
                      onClick={handleToggleOpen}
                      aria-label="Cerrar ventana de notas"
                      title="Cerrar notas">
                      <Icon name="close" />
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
                          <>
                            <p className={css['fn-selected-text-preview-title']}>Texto seleccionado:</p>
                            <div className={css['fn-selected-text-preview']}>
                              <blockquote>
                                <p>"{capturedText}"</p>
                              </blockquote>
                            </div>
                            <p className={css['fn-selected-text-preview-title']}>Anotación:</p>
                          </>
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
                          <button type="button" className={css['fn-btn--cancel-note']} onClick={handleBackToList}>
                            Cancelar
                          </button>
                          <button type="button" className={css['fn-btn--save-note']} onClick={handleSaveNote}>
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
