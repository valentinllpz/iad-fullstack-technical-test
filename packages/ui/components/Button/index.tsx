import { css } from "goober";
import { classnames } from "@repo/utils";

const baseStyles = css`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const variants = {
  primary: css`
    background-color: #3b82f6;
    color: white;
  `,
  secondary: css`
    background-color: #e5e7eb;
    color: #374151;
  `,
  danger: css`
    background-color: #ef4444;
    color: white;
  `,
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={classnames(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
