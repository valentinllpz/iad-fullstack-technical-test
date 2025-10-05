import { Card, Button } from "@repo/ui";
import { FiTrash2, FiImage } from "react-icons/fi";
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
}

const UnitCard = ({ unit, onDelete }: UnitCardProps) => {
  const hasPhoto = Boolean(unit.photoUrl);

  return (
    <Card className="unit-card">
      {hasPhoto ? (
        <img
          src={unit.photoUrl}
          alt={unit.name}
          className="unit-card__image"
        />
      ) : (
        <div className="unit-card__image unit-card__image--placeholder">
          <FiImage aria-hidden="true" className="unit-card__placeholder-icon" />
          <span className="unit-card__placeholder-text">Photo à venir</span>
        </div>
      )}

      <div className="unit-card__content">
        <span className="unit-card__title">{unit.name}</span>

        <div className="unit-card__details">
          <span className="unit-card__detail-item">
            📐 {unit.surface}m² • {unit.furnished ? "🪑 Meublé" : "🏠 Non meublé"}
          </span>
          <span
            className={classnames("unit-card__detail-item", "unit-card__price")}
          >
            💰 {unit.rentAmount}€/mois
          </span>
        </div>

        <span className="unit-card__landlords-label">Propriétaire(s):</span>
        <div className="unit-card__landlords">
          {unit.landlords.map((landlord) => (
            <span key={landlord.id} className="unit-card__landlord-tag">
              👤 {landlord.firstName} {landlord.lastName}
            </span>
          ))}
        </div>

        <div className="unit-card__actions">
          {onDelete && (
            <Button
              variant="danger"
              onClick={() => onDelete(unit.id)}
              className="unit-card__action-button unit-card__action-button--danger"
            >
              <FiTrash2 aria-hidden="true" className="unit-card__action-icon" />
              Supprimer
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UnitCard;
