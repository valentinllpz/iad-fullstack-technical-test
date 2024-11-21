import { Card } from "@repo/ui";

interface UnitCardProps {
  children: React.ReactNode;
}

const UnitCard = ({ children }: UnitCardProps) => {
  return <Card>{children}</Card>;
};

export default UnitCard;
