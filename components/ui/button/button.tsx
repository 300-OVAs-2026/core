import { useId } from 'react';
import type { ButtonProps as ButtonPropsUI } from 'books-ui';
import { Button as ButtonUI } from 'books-ui';

import { cn } from '@/shared/utils';

import { Icon } from '../icon';

import type { ButtonVariant } from './types/types';

import css from './button.module.css';

interface Props extends Omit<ButtonPropsUI, 'variant'> {
  addClass?: string;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<Props> = ({ addClass, label, variant, icon, iconPosition, ...props }) => {
  const id = useId();

  const gradientLeft = `borderGradientLeft-${id}`;
  const gradientRight = `borderGradientRight-${id}`;

  const ICON_MAP: Record<Exclude<ButtonVariant, 'secondary'>, JSX.Element> = {
    reset: <Icon name="button-reset"/>,
    check: <Icon name="button-reset"/>,
    select: <Icon name="button-select"/>,
    download: <Icon name="button-download"/>,
    next: <Icon name="button-next"/>,
  };

  const resolvedIcon = icon ?? (variant && variant !== 'secondary' ? ICON_MAP[variant] : null);
  const resolvedPosition = iconPosition ?? (variant === 'next' ? 'right' : 'left');

  return (
    <div className={css.wrapper}>
      {/* SVG izquierdo */}
      <svg className={css.leftBorder} viewBox="0 0 60 60">
        <defs>
          <linearGradient id={gradientLeft} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--linear-svg)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--white)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M30 0 L18 0 L0 18 L0 42 L18 60 L30 60 L30 0"
          stroke={`url(#${gradientLeft})`}
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* BOTÓN */}
      <ButtonUI addClass={cn(css.button, addClass)} label={label} {...props} hasAriaLabel data-type={variant}>
        {resolvedIcon && <span data-icon-position={resolvedPosition}>{resolvedIcon}</span>}
        <span className={css['button__label']}>{label}</span>
      </ButtonUI>

      {/* SVG derecho */}
      <svg className={css.rightBorder} viewBox="0 0 60 60">
        <defs>
          <linearGradient id={gradientRight} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--white)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--linear-svg)" stopOpacity="1" />
          </linearGradient>
        </defs>

        <path
          d="M30 0 L42 0 L60 18 L60 42 L42 60 L30 60 L30 0"
          stroke={`url(#${gradientRight})`}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};
