import { useCallback, useEffect, useRef, useState } from 'react';

import { useGamificationStore } from '@/store/gamification-store';

import { GamificationModal } from './gamification-modal';
import { GamificationStars } from './gamification-stars';

import type { ActivityResult, ActivityResultData, UseGamificationOptions } from './types/types';

export interface UseGamificationReturn {
  /** Estrellas restantes para esta actividad. */
  stars: number;
  /** Si la actividad ya fue completada. */
  completed: boolean;
  /**
   * Reporta el resultado de una sub-actividad.
   * Llamar con `true` / `false` o `{ success, correct?, total? }`.
   * Al alcanzar `options.total` resultados exitosos se abre el modal de completado.
   */
  reportResult: (result: ActivityResult) => void;
  /**
   * Decrementa una estrella. Llamar en el `onClick` del botón de reintentar.
   *
   * @example
   * ```tsx
   * <Selects.Button type="reset">
   *   <Button label="REINTENTAR" uiType="reset" onClick={notifyReset} />
   * </Selects.Button>
   * ```
   */
  notifyReset: () => void;
  /** Elemento JSX listo para insertar donde quieras mostrar las estrellas. */
  Stars: JSX.Element;
  /** Modal de completado. Insertar en el JSX; se abre automáticamente al completar. */
  Modal: JSX.Element;
}

/**
 * Hook de gamificación para activities y games.
 *
 * @example — activity (Selects)
 * ```tsx
 * const { reportResult, notifyReset, Stars, Modal } = useGamification({ id: 'act-01', total: 2 });
 *
 * <Stars />
 * <Selects onResult={({ result }) => reportResult(result)}>
 *   <Selects.Button type="reset">
 *     <Button label="REINTENTAR" uiType="reset" onClick={notifyReset} />
 *   </Selects.Button>
 * </Selects>
 * {Modal}
 * ```
 *
 * @example — game
 * ```tsx
 * const { reportResult, notifyReset, Stars, Modal } = useGamification({ id: 'game-01' });
 *
 * <Stars />
 * <GameBalloons onResult={reportResult} onReset={notifyReset} />
 * {Modal}
 * ```
 */
export const useGamification = ({
  id,
  total = 1,
  maxStars = 3,
  onRestart
}: UseGamificationOptions): UseGamificationReturn => {
  const { registerActivity, decrementStar, completeActivity } = useGamificationStore();
  const activities = useGamificationStore((state) => state.activities);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastResult, setLastResult] = useState<{ correct?: number; total?: number }>({});

  // Contador efímero (no persistido): sub-actividades exitosas en la sesión actual.
  const completedCountRef = useRef(0);

  useEffect(() => {
    registerActivity(id, maxStars);
  }, [id, maxStars, registerActivity]);

  const activity = activities[id];
  const stars = activity?.stars ?? maxStars;
  const completed = activity?.completed ?? false;

  const notifyReset = useCallback(() => {
    decrementStar(id);
  }, [id, decrementStar]);

  const reportResult = useCallback(
    (result: ActivityResult) => {
      const data: ActivityResultData = typeof result === 'boolean' ? { success: result } : result;

      if (!data.success) return;

      // Leer el store directamente para evitar un closure desactualizado.
      const { activities: latest } = useGamificationStore.getState();
      if (latest[id]?.completed) return;

      completedCountRef.current += 1;

      if (data.correct != null && data.total != null) {
        setLastResult({ correct: data.correct, total: data.total });
      }

      if (completedCountRef.current >= total) {
        completeActivity(id);
        setIsModalOpen(true);
      }
    },
    [id, total, completeActivity]
  );

  return {
    stars,
    completed,
    reportResult,
    notifyReset,
    Stars: <GamificationStars stars={stars} maxStars={maxStars} />,
    Modal: (
      <GamificationModal
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        correct={lastResult.correct}
        total={lastResult.total}
        onRestart={onRestart}
      />
    )
  };
};
