import { css } from "goober";

import { classnames } from "@repo/utils";

const styles = css`
  background-color: #fff;
  padding: 1rem;
  border: 1px solid #dedede;
  border-radius: 0.5rem;
`;

interface CardProps {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
}

const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
  return (
    <div
      data-testid={rest.dataTestId}
      className={classnames("card", styles, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

Card.displayName = "Card";

export { Card };
export type { CardProps };
