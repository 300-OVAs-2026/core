import { BACKGROUND } from './lib/constant';

import css from './game-basketball.module.css';

interface PropsGameBasketballLevel {
  addClass?: string;
  question: string;
  children: JSX.Element | JSX.Element[];
}

export const GameBasketballLevel: React.FC<PropsGameBasketballLevel> = ({ question, addClass, children, ...props }) => {
  const safeSrc = (rawSrc: string): string => rawSrc.replace(/\s/g, ''); // Elimina espacios en blanco accidentales
  const bg = safeSrc(BACKGROUND.cover); // Fondo de pantalla

  return (
    <div className={`${css.radios__container} ${addClass ?? ''}`} {...props}>
      <div className={css.radio__options} style={{ '--bg-image': `url("${bg}")` } as React.CSSProperties}>
        <div className={css.radio__options_container}>{children}</div>
      </div>
      <div className={css.radio__question}>
        <div className={css.radio__question_container}>
          <img src={safeSrc(BACKGROUND.left)} alt="" />
          <span dangerouslySetInnerHTML={{ __html: question }} />
          <img src={safeSrc(BACKGROUND.right)} alt="" />
        </div>
      </div>
    </div>
  );
};
