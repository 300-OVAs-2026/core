export type GameCasinoStates = 'wrong' | 'success';

export const silverAmount = [10, 15, 25];

export type Option = {
  label: string;
  id: string;
  name: string;
  state: string;
};

export type Options = {
  question: string;
  options: Option[];
};

export interface GameCasinoContextType {
  point: number;
  handlePoint: (point: number) => void;
}
