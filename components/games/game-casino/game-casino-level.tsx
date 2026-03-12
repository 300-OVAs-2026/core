import { useGameCasinoProvider } from './game-casino-context';
import { BG } from './lib/constant';

import css from './game-casino.module.css';

interface Props {
  children: React.ReactNode;
  label: string; 
  background?: string;
}

export const GameCasinoLevel = ({ children, label, background = BG.background }: Props) => {
  const { point } = useGameCasinoProvider();

  return (
    <div className={`${css.casino}`} style={{ '--casino-bg': `url(${background})` } as React.CSSProperties}>
      <div className={css['casino-point']}>
        <span>${point}</span>
      </div>
      <div className={css['casino-question']}>
        <div className={css['casino-questino-background']}>
          {point < 10 ? <p className="u-text-center">Fichas insuficientes. Presiona Reiniciar.</p> : <p>{label}</p>}
        </div>
      </div>
      <div className={css['casino-elements-wrapper']}>{children}</div>
    </div>
  );
};
