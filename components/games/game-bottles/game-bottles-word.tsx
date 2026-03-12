import { Icon } from '@ui';

import { useGameBottleContext } from './game-bottles-context';
import { CorrectIcon, WrongIcon } from './lib/icons';

import css from './styles/level.module.css';

export const Word = () => {
  const { spaces, removeLetter, setSelectIndex, selectIndex, openModal, PARCIAL_WORD } = useGameBottleContext();
  return (
    <div className={`${css.container_word} `}>
      <p aria-live="assertive" className="u-sr-only">
        {`palabra armada ${PARCIAL_WORD}`}
      </p>
      {openModal ? openModal === 'wrong' ? <WrongIcon /> : <CorrectIcon /> : null}

      {spaces[selectIndex] && openModal === null && (
        <button className={css.cancel_button} onClick={removeLetter} aria-label="eliminar palabra seleccionada">
          <Icon size="small" name="close" />
        </button>
      )}
      {spaces.map((obj, i) => (
        <button
          key={obj?.index || i}
          disabled={!!openModal}
          className={selectIndex === i ? css.select : undefined}
          onClick={() => setSelectIndex(i)}>
          {obj?.letter || '_'}
        </button>
      ))}
    </div>
  );
};
