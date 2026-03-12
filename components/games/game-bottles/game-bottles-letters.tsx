import { useEffect } from 'react';

import Bottle from './game-bottles-bottle';
import { useGameBottleContext } from './game-bottles-context';

import css from './styles/level.module.css';

interface Props {
  word?: string;
}

export const Letters = ({ word }: Props) => {
  const { setTargetWord, words, addLetter } = useGameBottleContext();
  useEffect(() => {
    setTargetWord(word || '');
  }, [word, setTargetWord]);
  return (
    <div className={css.container__bottles}>
      {words.map((props) => (
        <Bottle
          key={props.index}
          letter={props.letter}
          enable={props.enable}
          index={props.index}
          onClick={() => addLetter(props)}
        />
      ))}
    </div>
  );
};
