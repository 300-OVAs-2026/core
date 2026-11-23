import { cloneElement } from 'react';

import { useGameCasinoProvider } from './game-casino-context';

interface Props {
  type?: 'reset';
  children: React.ReactElement;
}

export const GameCasinoButton = ({ type, children }: Props) => {
  const { handleValidation, handleReset, button, validation, result } = useGameCasinoProvider();

  // El reinicio solo se habilita cuando la respuesta fue validada y es incorrecta
  const isDisabled = type === 'reset' ? !validation || result : validation || button;

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) return;

    // 1. Ejecutamos el onClick del hijo si existe
    children.props.onClick?.(e);

    // 2. Cambiamos el ternario por un if/else para que sea una instrucción válida
    if (type === 'reset') {
      handleReset();
    } else {
      handleValidation();
    }
  };

  return cloneElement(children, {
    ...children.props,
    disabled: isDisabled,
    onClick: handleClick
  });
};
