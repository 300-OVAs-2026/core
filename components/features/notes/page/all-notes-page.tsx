import { Fragment, useState } from 'react';
import { Content } from '@layouts';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@ui';
import { Audio, Col, Row } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import { NotePDFDocument } from '../components/NotePDFDocument';
import { useNotesStore } from '../store/notesStore';
import { exportNotesToTXT, formatRelativeTime, groupNotesByPage, prepareNotesForPDF } from '../utils/exportNotes';

import type { RichTextNode } from '../types/types';

import css from './all-notes-page.module.css';

export const AllNotes = () => {
  const { pageNotes, globalNotes } = useNotesStore();
  const { pages } = useOvaContext();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const groupedNotes = groupNotesByPage(pageNotes, globalNotes);
  const totalNotes = [...groupedNotes.values()].reduce((sum, notes) => sum + notes.length, 0);

  // Preparar datos para PDF
  const pdfData = prepareNotesForPDF(pageNotes, globalNotes);

  /**
   * Convierte un path a un título legible
   */
  const getPageTitle = (page: string): string => {
    if (page === 'Global') return 'Todas las páginas';
    if (page === '/') return 'Portada';

    // Buscar el índice del route que coincide
    const routeIndex = pages.findIndex((route) => route.path === page);

    if (routeIndex !== -1 && pages[routeIndex]) {
      return pages[routeIndex].title;
    }

    // Fallback: extraer número de página
    const match = page.match(/\/page-(\d+)/);
    if (match) {
      return `Página ${match[1]}`;
    }

    return page;
  };

  /**
   * Alterna la expansión de una fila
   */
  const toggleExpand = (page: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(page)) {
        newSet.delete(page);
      } else {
        newSet.add(page);
      }
      return newSet;
    });
  };

  /**
   * Obtiene la nota más reciente de un grupo
   */
  const getMostRecentTimestamp = (notes: any[]) => {
    return Math.max(...notes.map((note) => note.timestamp));
  };

  /**
   * Maneja la exportación a TXT
   */
  const handleExportTXT = () => {
    exportNotesToTXT(pageNotes, globalNotes);
  };

  const extractText = (node?: RichTextNode): string => {
    if (!node) return '';

    if (node.text) {
      return node.text;
    }

    if (node.content) {
      return node.content.map(extractText).join(' ');
    }

    return '';
  };

  return (
    <Content withOutTitle>
      <Audio a11y src="assets/audios/aud_des_ova-04_g4_sld-1.mp3" />
      <Row justifyContent="center" alignItems="center">
        <Col xs="11" mm="10" md="9" lg="8" hd="8" addClass="u-flow">
          <Audio addClass="u-my-0" src="assets/audios/aud_ova-04_g4_sld-1.mp3" />

          <div className={css['notes-header']}>
            <h1 className={css['notes-title']}>Mis Notas</h1>
            <p className={css['notes-subtitle']}>
              {totalNotes === 0
                ? 'No tienes notas guardadas'
                : `${totalNotes} ${totalNotes === 1 ? 'nota guardada' : 'notas guardadas'}`}
            </p>
          </div>

          {totalNotes > 0 && (
            <>
              <div className={css['notes-table-wrapper']}>
                <table className={css['notes-table']}>
                  <thead>
                    <tr>
                      <th className={css['col-module']}>Sección</th>
                      <th className={css['col-lesson']}></th>
                      <th className={css['col-count']}>Cantidad</th>
                      <th className={css['col-expand']}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(groupedNotes.entries()).map(([page, notes]) => {
                      const isExpanded = expandedRows.has(page);
                      const mostRecentTime = getMostRecentTimestamp(notes);

                      return (
                        <Fragment key={page}>
                          <tr key={page} className={css['table-row']}>
                            <td className={css['col-module']}>{getPageTitle(page)}</td>
                            <td className={css['col-lesson']}>{formatRelativeTime(mostRecentTime)}</td>
                            <td className={css['col-count']}>
                              <span className={css['count-badge']}>{notes.length}</span>
                            </td>
                            <td className={css['col-expand']}>
                              <button
                                type="button"
                                className={css['expand-button']}
                                onClick={() => toggleExpand(page)}
                                aria-label={isExpanded ? 'Contraer' : 'Expandir'}>
                                {isExpanded ? 'CONTRAER' : 'EXPANDIR'}
                              </button>
                            </td>
                          </tr>

                          {isExpanded && (
                            <tr key={`${page}-expanded`} className={css['expanded-row']}>
                              <td colSpan={4} className={css['expanded-content']}>
                                <div className={css['notes-list']}>
                                  {notes.map((note) => (
                                    <div key={note.id} className={css['note-item']}>
                                      <div className={css['note-item-header']}>
                                        <h3 className={css['note-item-title']}>{note.title}</h3>
                                        <span className={css['note-item-time']}>
                                          {formatRelativeTime(note.timestamp)}
                                        </span>
                                      </div>
                                      {note.selectedText && (
                                        <div className={css['note-item-captured']}>"{note.selectedText}"</div>
                                      )}
                                      <div className={css['note-item-preview']}>{extractText(note.content as RichTextNode) || 'Sin contenido'}</div>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className={css['export-section']}>
                <Button uiType="download" label="Descargar TXT" onClick={handleExportTXT} />

                <PDFDownloadLink
                  document={<NotePDFDocument notes={pdfData.notes} pageTitle={pdfData.title} />}
                  fileName={`notas-${Date.now()}.pdf`}
                  className={css['export-button-link']}>
                  {({ loading }) => (
                    <Button
                      uiType="download"
                      label={loading ? 'Preparando PDF...' : 'Exportar PDF'}
                      disabled={loading}
                    />
                  )}
                </PDFDownloadLink>
              </div>
            </>
          )}

          {totalNotes === 0 && (
            <div className={css['empty-state']}>
              <div className={css['empty-icon']}>📝</div>
              <p className={css['empty-text']}>Aún no has creado ninguna nota</p>
              <p className={css['empty-hint']}>
                Selecciona texto en cualquier página y haz clic en el ícono de notas para comenzar
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Content>
  );
};
