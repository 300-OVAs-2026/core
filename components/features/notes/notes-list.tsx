import { ClockIcon, EditIcon, NotesIcon, TrashIcon } from './notes-icons';
import { extractPlainText, formatDate, truncateText } from './utils/utils';

import type { NotesListProps } from './types/types';

import css from './floating-notes.module.css';

export const NotesList: React.FC<NotesListProps> = ({ notes, onSelectNote, onDeleteNote }) => {
  const handleDelete = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    onDeleteNote(noteId);
  };

  return (
    <div className={css['fn-notes-list']}>
      <div className={css['fn-notes-list-header']}>
        <h3 className={css['fn-notes-list-title']}>Tus Notas</h3>
      </div>

      <div className={css['fn-notes-list-content']}>
        {notes.length === 0 ? (
          <div className={css['fn-empty-state']}>
            <div className={css['fn-empty-state-icon']}>
              <NotesIcon />
            </div>
            <p className={css['fn-empty-state-text']}>No tienes notas aún</p>
            <p className={css['fn-empty-state-hint']}>
              Ver todas tus notas guardadas aquí.
              <br />
              <a href="#/notes" className={css['fn-empty-state-link']}>
                Ir a la página de notas
              </a>
            </p>
          </div>
        ) : (
          <ul className={css['fn-notes-items']}>
            {notes.map((note) => {
              const plainText = extractPlainText(note.content);
              const preview = note.selectedText || plainText;

              return (
                <li key={note.id} className={css['fn-note-item']}>
                  <div className={css['fn-note-item-content']}>
                    <div className={css['fn-note-item-header']}>
                      <h4 className={css['fn-note-item-title']}>{note.title || 'Sin título'}</h4>
                      <p className={css['fn-note-item-date']}>
                        <ClockIcon />
                        {formatDate(note.timestamp)}
                      </p>
                    </div>
                    <p className={css['fn-note-item-preview']}>{truncateText(preview, 80)}</p>
                    <div className={css['fn-note-item-actions']}>
                      <button
                        type="button"
                        className={css['fn-btn_note'] + ' ' + css['fn-btn--delete']}
                        onClick={(e) => handleDelete(e, note.id)}
                        aria-label="Eliminar nota">
                        <TrashIcon />
                        <span className={css['fn-btn_note-text']}>Eliminar</span>
                      </button>
                      <button
                        type="button"
                        className={css['fn-btn_note'] + ' ' + css['fn-btn--edit']}
                        onClick={() => onSelectNote(note.id)}
                        aria-label="Editar nota">
                        <EditIcon />
                        <span className={css['fn-btn_note-text']}>Editar</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
