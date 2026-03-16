import { useEffect, useRef, useState } from 'react';
import { Icon } from 'books-ui';
import { Code, Info, RotateCcw } from 'lucide-react';

import { useGamificationStore } from '@/store/gamification-store';
import { useOvaStore } from '@/store/ova-store';

import css from './dev-toolbar.module.css';

if (!import.meta.env.DEV) {
  throw new Error('DevToolbar should only be rendered in development mode.');
}

export const DevToolbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const resetGamification = useGamificationStore((state) => state.resetGamification);
  const resetVisitedPages = useOvaStore((state) => state.resetVisitedPages);

  // Cierra el panel al hacer clic fuera
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Cierra con Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleReset = (action: () => void) => {
    action();
    setOpen(false);
  };

  return (
    <div className={css.wrapper}>
      {open && (
        <div ref={panelRef} className={css.panel} role="dialog" aria-label="Dev toolbar panel">
          <p className={css['panel-label']}>
            <Icon>
                <Info />
            </Icon>
            OVA - Dev Tools
          </p>

          <div className={css['panel-divider']} aria-hidden="true" />

          <button type="button" className={css['panel-button']} onClick={() => handleReset(resetGamification)}>
            <Icon>
              <RotateCcw />
            </Icon>
            Reset Gamification
          </button>

          <button type="button" className={css['panel-button']} onClick={() => handleReset(resetVisitedPages)}>
            <Icon>
              <RotateCcw />
            </Icon>
            Reset OVA
          </button>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        className={`${css.toggle} ${open ? css['toggle--open'] : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Abrir Dev toolbar">
        <Icon>
          <Code />
        </Icon>
        <span className={css['toggle-label']}>DEV</span>
      </button>
    </div>
  );
};
