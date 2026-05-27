import { cloneElement } from 'react';

import { useGameCircularQuizContext } from './game-circular-quiz-context';

interface Props {
  type?: 'reset';
  children: React.ReactElement;
}

export const GamecircularQuizButton: React.FC<Props> = ({ type, children }) => {
  const { handleValidation, handleReset, button, validation, result } = useGameCircularQuizContext();

  return cloneElement(children, {
    ...children.props,
    disabled: type !== 'reset' ? button : validation ? result : true,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      if (children.props.onClick) {
        children.props.onClick(event);
      }
      (type === 'reset' ? handleReset : handleValidation)();
    }
  });
};
