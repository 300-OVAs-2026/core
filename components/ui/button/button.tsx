import { useId } from "react";
import type { ButtonProps as ButtonPropsUI } from "books-ui";
import { Button as ButtonUI } from "books-ui";

import { icons } from "./icons";

import type { ButtonVariant } from "./types/types";

import css from "./button.module.css";

interface Props extends ButtonPropsUI {
  addClass?: string;
  uiType?: ButtonVariant;
}

export const Button: React.FC<Props> = ({
  addClass,
  label,
  uiType = "primary",
  ...props
}) => {
  const id = useId();

  const gradientLeft = `borderGradientLeft-${id}`;
  const gradientRight = `borderGradientRight-${id}`;

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
      <ButtonUI
        addClass={`${css.button} ${addClass ?? ""}`}
        label={label}
        {...props}
        hasAriaLabel
        data-type={uiType}
      >
        {uiType !== "next" && icons[uiType]}

        <span>{label}</span>

        {uiType === "next" && icons[uiType]}
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