import type { Note } from '../types/types';

/**
 * Agrupa las notas por página
 */
export const groupNotesByPage = (pageNotes: Record<string, Note[]>, globalNotes: Note[]): Map<string, Note[]> => {
  const grouped = new Map<string, Note[]>();

  // Agregar notas globales
  if (globalNotes.length > 0) {
    grouped.set('Global', globalNotes);
  }

  // Agregar notas por página
  Object.entries(pageNotes).forEach(([page, notes]) => {
    if (notes.length > 0) {
      grouped.set(page, notes);
    }
  });

  return grouped;
};

/**
 * Formatea el tiempo relativo desde una fecha
 */
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'Hace un momento';
  if (minutes < 60) return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  if (hours < 24) return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  if (days < 7) return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
  if (weeks < 4) return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  if (months < 12) return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
  return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
};

/**
 * Convierte el contenido JSONContent de TipTap a texto plano
 */
export const jsonContentToPlainText = (content: any): string => {
  if (!content || !content.content) return '';

  let text = '';

  const processNode = (node: any): void => {
    if (node.type === 'text') {
      text += node.text;
    } else if (node.content) {
      node.content.forEach((child: any) => processNode(child));
      if (node.type === 'paragraph' || node.type === 'heading') {
        text += '\n';
      }
    }
  };

  content.content.forEach((node: any) => processNode(node));

  return text.trim();
};

/**
 * Exporta las notas a formato TXT
 */
export const exportNotesToTXT = (pageNotes: Record<string, Note[]>, globalNotes: Note[]): void => {
  const grouped = groupNotesByPage(pageNotes, globalNotes);
  let textContent = '=== MIS NOTAS ===\n\n';

  grouped.forEach((notes, page) => {
    textContent += `--- ${page} ---\n\n`;

    notes.forEach((note, index) => {
      textContent += `${index + 1}. ${note.title}\n`;
      textContent += `Fecha: ${new Date(note.timestamp).toLocaleString('es-ES')}\n`;

      if (note.selectedText) {
        textContent += `Texto capturado: "${note.selectedText}"\n`;
      }

      const plainContent = jsonContentToPlainText(note.content);
      textContent += `Contenido:\n${plainContent}\n\n`;
      textContent += '---\n\n';
    });
  });

  // Crear y descargar el archivo
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `notas-${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Exporta las notas a formato PDF usando react-pdf
 * Esta función prepara los datos para ser usados con PDFDownloadLink
 */
export const prepareNotesForPDF = (
  pageNotes: Record<string, Note[]>,
  globalNotes: Note[]
): { notes: Note[]; title: string } => {
  const grouped = groupNotesByPage(pageNotes, globalNotes);
  const allNotes: Note[] = [];

  // Combinar todas las notas en un solo array
  grouped.forEach((notes) => {
    allNotes.push(...notes);
  });

  // Ordenar por timestamp descendente
  allNotes.sort((a, b) => b.timestamp - a.timestamp);

  return {
    notes: allNotes,
    title: 'Mis Notas'
  };
};
