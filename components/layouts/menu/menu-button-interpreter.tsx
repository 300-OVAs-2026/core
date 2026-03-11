import { useA11y } from '@features/a11y-overlay/hooks/useA11y';
import { EVENT } from '@features/interpreter/lib/constants';
import { Icon } from '@ui';

import { useOvaStore } from '@/store/ova-store';

import { i18n } from './lib/constant';

import css from './menu.module.css';

export const MenuButtonInterpreter = () => {
  // TODO: Arreglar el estado, dado que cuando se cierra el inerprete desde el botón de cerrar, el estado del useA11y no se actualiza, lo que hace que el botón de menú quede desincronizado con el estado real del intérprete. Esto se debe a que el evento de cerrar el intérprete no actualiza el estado del useA11y, lo que provoca que el botón de menú no refleje correctamente si el intérprete está activo o no.
  const lang = useOvaStore((state) => state.lang);
  const { config, setConfig } = useA11y();

  /**
   * Function to toggle the interpreter visibility and dispatch a custom event to notify other components.
   * @param value - A boolean indicating whether the interpreter should be hidden (true) or shown (false).
   */
  const toggleInterpreter = (value: boolean) => {
    setConfig('interpreter', value);

    // Dispatch custom event to toggle interpreter visibility
    const event = new CustomEvent(EVENT.VISIBILITY, {
      detail: { hidden: value },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  };

  return (
    <button
      onClick={() => toggleInterpreter(!config.interpreter)}
      className={css['menu__button--accessibility']}
      aria-label={config.interpreter ? i18n[lang].interpreterPause : i18n[lang].interpreterActive}>
      <svg width="0" height="0" className={css['menu__button--audio_clip-path']}>
        <defs>
          <clipPath id="menu-doble-diagonal-cut" clipPathUnits="objectBoundingBox">
            <path d="M 0.055,0 L 1,0 L 0.93, 1 L 0, 1 Z" />
          </clipPath>
        </defs>
      </svg>
      <span className={css['menu__button-content']}>
        <Icon name="hand-a11y" />
        <span>{config.interpreter ? i18n[lang].interpreterPause : i18n[lang].interpreterActive}</span>
      </span>
    </button>
  );
};
