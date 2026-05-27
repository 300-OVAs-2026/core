import { createContext } from 'books-ui';

import type { GameCircularQuizContextType } from './types/types';

export const [GameCircularQuizProvider, useGameCircularQuizContext] = createContext<GameCircularQuizContextType>({
  name: 'GameCircularQuizContext'
});
