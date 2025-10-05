import { Card } from "@repo/ui";

import "./styles.css";

interface AddUnitCardProps {
  onClick: () => void;
}

const AddUnitCard = ({ onClick }: AddUnitCardProps) => {
  return (
    <Card
      className="add-unit-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Ajouter un bien"
    >
      <span className="add-unit-card__icon" aria-hidden="true">
        <span className="add-unit-card__icon-symbol">+</span>
      </span>
      <span className="add-unit-card__label">Ajouter un bien</span>
    </Card>
  );
};

export default AddUnitCard;
