import type { ChangeEvent, FC, HTMLAttributes, ReactNode } from "react";
import { css } from "goober";

import { classnames } from "@repo/utils";

interface ToggleProps extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  disabled?: boolean;
  id?: string;
}

const containerStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  color: inherit;
`;

const disabledContainerStyles = css`
  cursor: not-allowed;
  opacity: 0.6;
`;

const inputStyles = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const trackStyles = css`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 9999px;
  background: #cbd5f5;
  transition: background 0.2s ease;
`;

const thumbStyles = css`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.2);
  transition: transform 0.2s ease;
`;

const checkedTrackStyles = css`
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
`;

const checkedThumbStyles = css`
  transform: translateX(20px);
`;

const Toggle: FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  className,
  ...rest
}) => {
  return (
    <label
      className={classnames(
        containerStyles,
        disabled && disabledContainerStyles,
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        className={inputStyles}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <span className={classnames(trackStyles, checked && checkedTrackStyles)}>
        <span className={classnames(thumbStyles, checked && checkedThumbStyles)} />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
};

Toggle.displayName = "Toggle";

export { Toggle };
export type { ToggleProps };
