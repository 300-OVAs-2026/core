import React, { useState } from 'react';

import { GameCasinoStates, Options } from './types/types';
import GameCasinoButton from './game-casino-button';
import { useGameCasinoProvider } from './game-casino-context';
import CasinoElement from './game-casino-element';

// import { loadCSS } from '@core/utils';
import css from './game-casino.module.css';

// const css = await loadCSS({
//   ui: 'game-casino/game-casino.module.css',
//   local: 'game-casino/game-casino.module.css'
// });

interface Props {
  option: Options;
  background?: string;
  alt?: string;
  title?: string;
  onResult: (selected: GameCasinoStates | string) => void;
}

export const Casino = ({
  option,
  background = 'assets/images/casino-game-background.webp',
  onResult,
  alt,
  title
}: Props) => {
  const [selected, setSelected] = useState<GameCasinoStates | string>('');
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const { point, handlePoint } = useGameCasinoProvider();
  const [disabledButton, setDisabledButton] = useState({ reset: true, activity: true });
  const [amount, setAmount] = useState<number>(point);
  const [validated, setValidated] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleChange = (id: string, amount: number, state: GameCasinoStates | string) => {
    setSelected(state);
    setSelectedId(id);
    setAmount(amount);
    setSelectedAmount(amount);

    setDisabledButton((prev) => ({ ...prev, reset: true, activity: false }));
  };

  const handleValidate = () => {
    if (onResult) {
      setValidated(true);
      if (selected === 'success') {
        setDisabledButton((prev) => ({ ...prev, reset: true, activity: true }));
        handlePoint(amount);
      } else {
        setDisabledButton((prev) => ({ ...prev, reset: false, activity: true }));
      }
      onResult(selected);
    }
  };

  const handleReset = () => {
    setValidated(false);
    setSelected('');
    setSelectedId(null);
    setSelectedAmount(null);
    setDisabledButton({ reset: true, activity: true });
    handlePoint(0);
  };

  return (
    <figure className="u-flow">
      <div
        className={`${css['casino']} u-py-2 u-px-2`}
        style={{ '--casino-bg': `url(${background})` } as React.CSSProperties}>
        <span className={css['casino-point']}>${point}</span>
        <div className={css['casino-question']}>
          <div className={css['casino-questino-background']}>
            <p>{option.question}</p>
          </div>
        </div>

        <div className={css['casino-elements-wrapper']}>
          {option?.options?.map(({ id, label, name, state }) => (
            <CasinoElement
              state={state}
              id={id}
              key={id}
              label={label}
              name={name}
              onValueChange={handleChange}
              isSelected={selectedId === id}
              hasValidated={validated}
              selectedAmount={selectedId === id ? selectedAmount : null}
              disabled={selectedId !== null && selectedId !== id}
            />
          ))}
        </div>
      </div>

      <figcaption className={css['casino-figcaption']}>
        <p>
          <strong>{title}</strong>&nbsp;{alt}
        </p>
      </figcaption>

      <GameCasinoButton handleReset={handleReset} handleValidate={handleValidate} disabledButton={disabledButton} />
    </figure>
  );
};
