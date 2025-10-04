import { Card, Button } from "@repo/ui";
import { classnames } from "@repo/utils";

import "./styles.css";

interface Unit {
  id: string;
  name: string;
  surface: number;
  furnished: boolean;
  rentAmount: string;
  photoUrl?: string;
  landlords: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
}

interface UnitCardProps {
  unit: Unit;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const UnitCard = ({ unit, onDelete, onEdit }: UnitCardProps) => {
  return (
    <Card>
      {unit.photoUrl && (
        <img
          src={unit.photoUrl}
          alt={unit.name}
          className="unit-card__image"
        />
      )}

      <div className="unit-card__content">
        <h3 className="unit-card__title">{unit.name}</h3>

        <div className="unit-card__details">
          <p className="unit-card__detail-item">
            📐 {unit.surface}m² •{" "}
            {unit.furnished ? "🪑 Meublé" : "🏠 Non meublé"}
          </p>
          <p
            className={classnames(
              "unit-card__detail-item",
              "unit-card__price"
            )}
          >
            💰 {unit.rentAmount}€/mois
          </p>
        </div>

        {unit.landlords && unit.landlords.length > 0 && (
          <div className="unit-card__landlords">
            <p className="unit-card__landlords-label">Propriétaire(s):</p>
            {unit.landlords.map((landlord) => (
              <span key={landlord.id} className="unit-card__landlord-tag">
                👤 {landlord.firstName} {landlord.lastName}
              </span>
            ))}
          </div>
        )}

        <div className="unit-card__actions">
          {onEdit && (
            <Button
              variant="secondary"
              onClick={() => onEdit(unit.id)}
              className="unit-card__action-button"
            >
              ✏️ Modifier
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger"
              onClick={() => onDelete(unit.id)}
              className="unit-card__action-button"
            >
              🗑️ Supprimer
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UnitCard;
