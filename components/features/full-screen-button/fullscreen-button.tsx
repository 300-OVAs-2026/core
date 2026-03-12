import { useEffect, useMemo } from 'react';
import { Icon } from '@ui';
import type { ButtonProps as ButtonPropsUI } from 'books-ui';
import { Button, Tooltip } from 'books-ui';

import { useFullScreen } from '@shared/hooks';
import { useOvaStore } from '@/store/ova-store';

import { i18n } from './lib/constant';

import css from './fullscreen-button.module.css';

interface Props extends ButtonPropsUI {
  elementId: string;
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  controlFullScreen?: boolean;
}

export const FullScreenButton: React.FC<Props> = ({
  elementId,
  label,
  addClass,
  controlFullScreen,
  onClick,
  ...props
}) => {
  const lang = useOvaStore((state) => state.lang);
  const [isFullScreen, toggleFullScreen] = useFullScreen(elementId);

  // Verifica si el modo de pantalla completa está habilitado en el navegador
  const isFullScreenEnabled = useMemo(() => document.fullscreenEnabled, []);

  const DEFAULT_LABEL = isFullScreen ? i18n[lang].labelExit : i18n[lang].label;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
    toggleFullScreen();
  };

  useEffect(() => {
    if (controlFullScreen) {
      toggleFullScreen();
    }
  }, [controlFullScreen, toggleFullScreen]);

  return (
    <Tooltip
      label={label || DEFAULT_LABEL}
      addClass={css['tooltip']}
      distance={13}
      hasArrow
      isDisabled={!isFullScreenEnabled}>
      <Button
        label={label || DEFAULT_LABEL}
        aria-pressed={isFullScreen}
        hasAriaLabel
        onClick={handleButtonClick}
        disabled={!isFullScreenEnabled}
        addClass={`${css['button']} ${addClass ?? ''}`}
        {...props}>
        <Icon name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
      </Button>
    </Tooltip>
  );
};