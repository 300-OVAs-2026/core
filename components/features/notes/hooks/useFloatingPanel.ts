import { useState } from 'react';

interface UseFloatingPanelReturn {
  isOpen: boolean;
  isMinimized: boolean;
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsMinimized: (isMinimized: boolean) => void;
}

/**
 * Hook para manejar el estado de apertura y minimización del panel flotante.
 */
export const useFloatingPanel = (): UseFloatingPanelReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  /**
   * Alterna el estado de apertura del panel
   */
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  return {
    isOpen,
    isMinimized,
    toggleOpen,
    setIsOpen,
    setIsMinimized
  };
};
