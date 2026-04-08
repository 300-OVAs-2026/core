import { useEffect } from 'react';

import { useA11y } from '@features/a11y-overlay/hooks/useA11y';
import { EVENT } from '@features/interpreter/lib/constants';
import { Icon } from '@ui';
import { cn } from '@/shared/utils';
import { useOvaStore } from '@/store/ova-store';

import { i18n } from './lib/constant';

import css from './menu.module.css';

export const MenuButtonInterpreter = () => {
  const lang = useOvaStore((state) => state.lang);
  const { config, setConfig } = useA11y();

  /**
   * Function to toggle the interpreter visibility and dispatch a custom event to notify other components.
   * @param value - A boolean indicating whether the interpreter should be hidden (true) or shown (false).
   */
  const toggleInterpreter = (value: boolean) => {
    // Dispatch custom event to toggle interpreter visibility
    const event = new CustomEvent(EVENT.VISIBILITY, {
      detail: { hidden: value },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);

    setConfig('interpreter', value);
  };

  useEffect(() => {
    // Handler to update state when the interpreter is closed from within the interpreter component
    const handleInterpreterClosed = () => {
      setConfig('interpreter', true);
    };

    document.addEventListener(EVENT.CLOSED, handleInterpreterClosed as EventListener);

    return () => {
      document.removeEventListener(EVENT.CLOSED, handleInterpreterClosed as EventListener);
    };
  }, []);

  return (
    <button
      className={cn(css['menu__button'], css['menu__button--dark-blue'], css['menu__button--double-diagonal-cut'], 'js-button-interpreter')}
      aria-label={config.interpreter ? i18n[lang].interpreterPause : i18n[lang].interpreterActive}
      onClick={() => toggleInterpreter(!config.interpreter)}>
      <span className={css['menu__button-content']}>
        <Icon name="hand-a11y" />
        <span className={css['menu__button-label']}>
          {config.interpreter ? i18n[lang].interpreterPause : i18n[lang].interpreterActive}
        </span>
      </span>
    </button>
  );
};
