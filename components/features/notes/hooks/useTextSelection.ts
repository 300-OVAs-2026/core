import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

import { captureSelectedText } from '../utils/utils';

interface Position {
  x: number;
  y: number;
}

interface UseTextSelectionProps {
  containerRef: RefObject<HTMLDivElement>;
  onCapture?: (text: string) => void;
}

interface UseTextSelectionReturn {
  showTooltip: boolean;
  tooltipPosition: Position;
  handleCaptureText: () => void;
}

/**
 * Hook para manejar la selección de texto y mostrar un tooltip de captura.
 * Detecta cuando el usuario selecciona texto en la página (excepto dentro del contenedor de notas).
 */
export const useTextSelection = ({ containerRef, onCapture }: UseTextSelectionProps): UseTextSelectionReturn => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (selectedText && selectedText.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (range && rect) {
          // Verificar si la selección está dentro del panel de notas
          const commonAncestor = range.commonAncestorContainer;
          const isInsideNotesPanel = containerRef.current?.contains(
            commonAncestor.nodeType === Node.ELEMENT_NODE ? (commonAncestor as Element) : commonAncestor.parentElement
          );

          // Solo mostrar tooltip si NO está dentro del panel de notas
          if (!isInsideNotesPanel) {
            setTooltipPosition({
              x: rect.left + rect.width / 2,
              y: rect.top - 50
            });
            setShowTooltip(true);
          } else {
            setShowTooltip(false);
          }
        } else {
          setShowTooltip(false);
        }
      } else {
        setShowTooltip(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionChange);
    };
  }, [containerRef]);

  /**
   * Captura el texto seleccionado y ejecuta el callback
   */
  const handleCaptureText = () => {
    const selectedText = captureSelectedText();
    if (selectedText) {
      onCapture?.(selectedText);
      setShowTooltip(false);
      window.getSelection()?.removeAllRanges();
    }
  };

  return {
    showTooltip,
    tooltipPosition,
    handleCaptureText
  };
};
