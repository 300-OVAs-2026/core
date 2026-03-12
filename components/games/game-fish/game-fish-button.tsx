
import { cloneElement } from 'react';

import { useGameFishActivityContext } from './game-fish-context';

interface Props {
  type?: 'reset';
  children: React.ReactElement;
}

export const GameFishButton: React.FC<Props> = ({ type, children }) => {
  const { handleValidation, handleReset, button, validation } = useGameFishActivityContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (children.props.onClick) {
      children.props.onClick(event);
    }

    if (type === 'reset') {
      handleReset();
    } else {
      handleValidation();
    }
  };

  const isDisabled = type === 'reset' ? !validation : validation || button;

  return cloneElement(children, {
    ...children.props,
    disabled: isDisabled,
    onClick: handleClick
  });
};
