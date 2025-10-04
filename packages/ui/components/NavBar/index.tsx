import { css } from "goober";
import { classnames } from "@repo/utils";

interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional title displayed on the left slot */
  title?: React.ReactNode;
  /** Custom content for the left side (overrides `title` when provided) */
  startContent?: React.ReactNode;
  /** Optional content rendered in the center section */
  children?: React.ReactNode;
  /** Optional content rendered on the right side */
  endContent?: React.ReactNode;
  /** Enables sticky positioning at the top of the viewport */
  sticky?: boolean;
}

const containerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  backdrop-filter: blur(6px);
  box-sizing: border-box;
`;

const stickyStyles = css`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const sectionStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 2.5rem;
`;

const titleStyles = css`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
`;

const middleStyles = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBar: React.FC<NavBarProps> = ({
  title,
  startContent,
  children,
  endContent,
  sticky = false,
  className,
  ...rest
}) => {
  const leftSlot = startContent ??
    (title ? <h1 className={titleStyles}>{title}</h1> : null);

  return (
    <nav
      className={classnames(containerStyles, sticky && stickyStyles, className)}
      {...rest}
    >
      <div className={sectionStyles}>{leftSlot}</div>
      {children ? <div className={classnames(sectionStyles, middleStyles)}>{children}</div> : <div />}
      <div className={sectionStyles}>{endContent}</div>
    </nav>
  );
};

NavBar.displayName = "NavBar";

export { NavBar };
export type { NavBarProps };
