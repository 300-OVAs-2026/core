import { createContext } from 'books-ui';

import type { letterProp, spaceProp } from './types/types';

type GameBottleContextType = {
  targetWord: string;
  setTargetWord: (word: string) => void;
  words: letterProp[];
  spaces: (spaceProp | null)[];
  selectIndex: number;
  setSelectIndex: (index: number) => void;
  addLetter: (obj: letterProp) => void;
  removeLetter: () => void;
  checkAnswer: () => void;
  reset: () => void;
  openModal: 'success' | 'wrong' | null;
  ALREADY_FILL: boolean;
  PARCIAL_WORD: string;
  containerRef: React.RefObject<HTMLDivElement>;
};

export const [GameBottleContextProvider, useGameBottleContext] = createContext<GameBottleContextType>({
  name: 'GameBottleContext'
});
