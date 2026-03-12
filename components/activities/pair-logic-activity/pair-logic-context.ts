import { createContext } from 'books-ui';

import type  { State } from './pair-logic-activity';

interface PairLogicContextType {
  handleValidation: () => void;
  HandleReset: () => void;
  validation: boolean | null;
  button: boolean;
  result: boolean;
  imageSelected: { src: string | null; alt: string | null; join: string | null };
  text: { text: string | null; join: string | null };
  lockedJoins: string[];
  endActivity: boolean;

  updateActivity: React.Dispatch<Partial<State>>;
}
export const [GameJoinProvider, useGameJoinContext] = createContext<PairLogicContextType>({
  name: 'GameJoinContext'
});
