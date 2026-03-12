import { useId, useState, cloneElement } from "react";
import css from "./tooltip.module.css";

type Orientation = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  label: string;
  orientation?: Orientation;
  children: React.ReactElement;
}

export const Tooltip = ({
  label,
  orientation = "top",
  children
}: TooltipProps) => {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={css.wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {cloneElement(children, {
        "aria-describedby": id
      })}

      {visible && (
        <div
          id={id}
          role="tooltip"
          className={`${css.tooltip} ${css[orientation]}`}
        >
          {label}
        </div>
      )}
    </div>
  );
};