import { useState } from 'react';
import type { DraggableEventHandler } from 'react-draggable';

interface Position {
  x: number;
  y: number;
}

interface UseDraggablePositionReturn {
  position: Position;
  handleDrag: DraggableEventHandler;
  resetPosition: () => void;
}

/**
 * Hook para manejar la posición de un elemento arrastrable.
 * Calcula la posición inicial en el borde inferior derecho y permite arrastrar y resetear.
 */
export const useDraggablePosition = (): UseDraggablePositionReturn => {
  /**
   * Calcula la posición inicial en el borde inferior derecho
   */
  const getInitialPosition = (): Position => {
    const windowHeight = window.innerHeight;
    const panelHeight = 470;
    const containerTop = window.innerHeight * 0.11;

    return {
      x: 0 - 8,
      y: windowHeight - containerTop - panelHeight - 55
    };
  };

  const [positionDrag, setPositionDrag] = useState({
    deltaPosition: getInitialPosition()
  });

  /**
   * Maneja el evento de arrastre del elemento
   */
  const handleDrag: DraggableEventHandler = (_, data) => {
    const { x, y } = positionDrag.deltaPosition;

    setPositionDrag({
      deltaPosition: {
        x: x + data.deltaX,
        y: y + data.deltaY
      }
    });
  };

  /**
   * Restablece la posición del elemento a la posición inicial
   */
  const resetPosition = () => {
    setPositionDrag({
      deltaPosition: getInitialPosition()
    });
  };

  return {
    position: positionDrag.deltaPosition,
    handleDrag,
    resetPosition
  };
};
