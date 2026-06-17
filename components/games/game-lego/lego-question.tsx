import { useGameLegoContext } from './game-lego-context';
import { BACKGROUND } from './lib/constant';

import css from './game-lego.module.css';
interface Props {
  label: string;
  children: JSX.Element | JSX.Element[];
  addClass?: string;
}

export const LegoQuestion: React.FC<Props> = ({ children, addClass, label, ...props }) => {
  const { validation, options } = useGameLegoContext();

  const safeSrc = (rawSrc: string): string => rawSrc.replace(/\s/g, ''); // Elimina espacios en blanco accidentales
  const bg = safeSrc(BACKGROUND); // Fondo de pantalla

  const selectedOption = options?.[0];

  /**
   * Obtiene la clase CSS para un botón según su estado y si está seleccionado.
   * @returns {string} La clase CSS correspondiente
   */
  const questionClass = !validation ? '' : selectedOption?.state === 'success' ? css.correct : css.incorrect;

  return (
    <div
      className={` ${css.lego__container}   ${addClass ?? ''} `}
      style={{ '--bg-image': `url(${bg})` } as React.CSSProperties}
      {...props}>
      <div className={`${css.lego__question} ${questionClass}`} role="heading" aria-level={2}>
        <h2>{label}</h2>
      </div>
      <div className={css.lego__options}>{children}</div>
    </div>
  );
};
