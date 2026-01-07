export type RadioStates = 'wrong' | 'success';

export type Option = {
  id: string;
  name: string;
  state: RadioStates;
};

export interface InitialState {
  validation: boolean;
  button: boolean;
  result: boolean;
  options: Option[];
}

// Define la interfaz para el contexto de actividad
export interface GameQuestionContextType {
  addRadiosValues: (option: Option) => void;
  handleValidation: () => void;
  handleReset: () => void;
  validation: boolean;
  button: boolean;
  result: boolean;
  addElementsId: (uid: string) => void;
}

// Enumeración para los estados posibles
export enum States {
  SUCCESS = 'success',
  WRONG = 'wrong'
}
