export interface SentenceItem {
  id: number;
  words: string[];
  answer: string;
}

export interface SentenceState {
  order: string[];
  checked: boolean;
  correct: boolean | null;
}

export interface InitialState {
  sentenceStates: Record<number, SentenceState>;
  button: boolean;
  validation: boolean;
  result: boolean;
}

export interface OrderPhraseActivityContextType extends InitialState {
  registerSentence: (sentence: SentenceItem) => void;
  moveWord: (sentenceId: number, fromIdx: number, toIdx: number) => void;
  handleValidation: () => void;
  handleReset: () => void;
}