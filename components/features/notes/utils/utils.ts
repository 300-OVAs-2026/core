/**
 * Captura el texto seleccionado actualmente en la página
 * @returns El texto seleccionado o una cadena vacía
 */
export const captureSelectedText = (): string => {
  const selection = window.getSelection();
  
  if (!selection || selection.rangeCount === 0) {
    return '';
  }

  const selectedText = selection.toString().trim();
  return selectedText;
};

/**
 * Limpia la selección actual de texto
 */
export const clearSelection = (): void => {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
};

/**
 * Formatea una fecha en formato legible
 * @param timestamp - Timestamp en milisegundos
 * @returns Fecha formateada
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Ahora';
  if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`;
  if (diffInHours < 24) return `Hace ${diffInHours}h`;
  if (diffInDays < 7) return `Hace ${diffInDays}d`;
  
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

/**
 * Trunca un texto a una longitud específica
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 * @returns Texto truncado
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Extrae texto plano del contenido JSON de Tiptap
 * @param content - Contenido JSON de Tiptap
 * @returns Texto plano extraído
 */
export const extractPlainText = (content: Record<string, unknown>): string => {
  if (!content) return '';
  
  const extractText = (node: Record<string, unknown>): string => {
    if (node.type === 'text') {
      return typeof node.text === 'string' ? node.text : '';
    }
    
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(extractText).join('');
    }
    
    return '';
  };
  
  return extractText(content).trim();
};
