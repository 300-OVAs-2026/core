import { useCallback, useEffect, useState } from 'react';
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
  const getInitialPosition = useCallback((): Position => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const panelHeight = 470;
    const containerTop = window.innerHeight * 0.11;

    // Lógica para la posición responsiva

    if (windowWidth < 500) {
      // Posición inicial responsiva en móviles para anclarse en la parte inferior centrada
      return {
        x: windowWidth * 0.22 + 40,
        y: -(windowHeight * 0.43)
      };
    }

    // Posición original para pantallas más grandes
    return {
      x: 0 - 170,
      y: windowHeight - containerTop - panelHeight - 180
    };
  }, []);

  const [positionDrag, setPositionDrag] = useState({
    deltaPosition: getInitialPosition()
  });

  // Actualizar la posición si la ventana cambia de tamaño
  useEffect(() => {
    const handleResize = () => {
      setPositionDrag({ deltaPosition: getInitialPosition() });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getInitialPosition]);

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
  const resetPosition = useCallback(() => {
    setPositionDrag({
      deltaPosition: getInitialPosition()
    });
  }, [getInitialPosition]);

  return {
    position: positionDrag.deltaPosition,
    handleDrag,
    resetPosition
  };
};
