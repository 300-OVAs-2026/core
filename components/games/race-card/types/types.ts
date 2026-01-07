// Define los tipos para los valores almacenados en el contexto
export interface RaceCardStateType {
  pointplayer1: number;
  pointplayer2: number;
  move1: number;
  move2: number;
  answeredCount: number;
  rightAnswers: number;
}

// Define el tipo completo del contexto incluyendo el setter
export interface RaceCardContextType {
  game: RaceCardStateType;
  updateGame: React.Dispatch<Partial<RaceCardStateType>>;
  questionCount: number;
}

export interface modalType {
  audioSuccess: string;
  textSuccess: string;
  audioWrong: string;
  textWrong: string;
  interpreterSuccess?: string;
  interpreterWrong?: string;
}

export interface ActivityOptions {
  validation?: boolean;
  button?: boolean;
  showFeedback?: boolean;
  lastFeedback?: boolean;
}

export interface DriversType {
  player?: string;
  machine?: string;
}

export type ModalName = 'correct' | 'incorrect' | 'final-success' | 'final-failure';
