import type { FC, HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { css } from "goober";

import { classnames } from "@repo/utils";

interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
  width?: number | string;
  closeOnOverlayClick?: boolean;
}

const overlayStyles = css`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1000;
`;

const dialogStyles = css`
  position: relative;
  width: min(560px, 100%);
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 30px 60px -40px rgba(15, 23, 42, 0.5);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const headerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const titleStyles = css`
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
`;

const closeButtonStyles = css`
  border: none;
  background: transparent;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s ease;

  &:hover {
    color: #1f2937;
  }
`;

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  width,
  closeOnOverlayClick = true,
  className,
  ...rest
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose?.();
    }
  };

  const dialogStyle = width
    ? classnames(dialogStyles, css`width: ${typeof width === "number" ? `${width}px` : width};`)
    : dialogStyles;

  return (
    <div className={overlayStyles} role="presentation" onClick={handleOverlayClick}>
      <div
        ref={dialogRef}
        className={classnames(dialogStyle, className)}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        onClick={(event) => event.stopPropagation()}
        {...rest}
      >
        {(title || onClose) && (
          <div className={headerStyles}>
            {title ? <h2 className={titleStyles}>{title}</h2> : <span />}
            {onClose ? (
              <button
                type="button"
                className={closeButtonStyles}
                aria-label="Fermer la fenêtre"
                onClick={() => onClose?.()}
              >
                ×
              </button>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";

export { Modal };
export type { ModalProps };
