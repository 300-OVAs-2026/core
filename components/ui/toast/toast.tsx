import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import type { VideoURLs } from '@shared/hooks';
import { useFocusTrap,useInterpreter } from '@shared/hooks';
import { useOvaStore } from '@/store/ova-store';

import { Icon } from '../icon';

import { i18n } from './lib/constant';

import css from './toast.module.css';

export interface ToastCoreProps {
  isOpen: boolean;
  onClose?: () => void;
  addClass?: string;
  interpreter?: VideoURLs;
  children: React.ReactNode;
}

export const Toast: React.FC<ToastCoreProps> = ({ isOpen, onClose, addClass, interpreter, children }) => {
  const lang = useOvaStore((state) => state.lang);
  const [updateVideoSources, restoreLastVideoSources] = useInterpreter();
  const flagOpenToast = useRef(false);

  /**
   * Maneja el cierre del toast.
   * Llama a la función de cierre si está definida y restaura las fuentes de video anteriores.
   */
  const handleCloseToast = () => {
    onClose?.();
    restoreLastVideoSources();
  };

  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, handleCloseToast);

  /**
   * Efecto para actualizar las fuentes de video cuando el intérprete cambia o el toast se abre.
   * Si el intérprete no está definido o el toast no está abierto, no hace nada.
   * De lo contrario, actualiza las fuentes de video con los datos del intérprete.
   */
  useEffect(() => {
    if (interpreter && isOpen && !flagOpenToast.current) {
      flagOpenToast.current = true;
      updateVideoSources({ ...interpreter });
    }

    if (!isOpen && flagOpenToast.current) {
      flagOpenToast.current = false;
    }
  }, [interpreter, isOpen, updateVideoSources]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          className={`${css.toast} ${addClass ?? ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={i18n[lang].dialogLabel}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <button className={css['toast__close']} onClick={handleCloseToast} aria-label={i18n[lang].btnModal}>
            <Icon name="close" />
          </button>

          <div className={css['toast__content']}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
