import { useEffect, useRef } from 'react';
import type { VideoURLs } from '@shared/hooks';
import { useInterpreter } from '@shared/hooks';

import css from './toast.module.css';
import { useOvaStore } from '@/store/ova-store';
import { i18n } from './lib/constant';
import { Icon } from '../icon';

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

  if (!isOpen) return null;

  return (
    <div className={`${css.toast} ${addClass ?? ''}`}>
      <button className={css.close} onClick={handleCloseToast} aria-label={i18n[lang].btnModal}>
        <Icon name="close" />
      </button>

      <div className={css['toast-content']}>{children}</div>
    </div>
  );
};
