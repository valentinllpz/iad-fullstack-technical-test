import React from "react";

import { Button, Modal, Toggle } from "@repo/ui";

import type { CreateUnitPayload, LandlordDto } from "../../lib/api";

import "./styles.css";

interface AddUnitModalProps {
  open: boolean;
  onClose: () => void;
  landlords: LandlordDto[];
  onSubmit: (payload: CreateUnitPayload) => Promise<void> | void;
}

interface FormState {
  name: string;
  surface: string;
  rentAmount: string;
  photoUrl?: string;
  furnished: boolean;
}

const initialState: FormState = {
  name: "",
  surface: "",
  rentAmount: "",
  photoUrl: "",
  furnished: true,
};

const AddUnitModal = ({
  open,
  onClose,
  landlords,
  onSubmit,
}: AddUnitModalProps) => {
  const [formState, setFormState] = React.useState<FormState>(initialState);
  const [selectedLandlords, setSelectedLandlords] = React.useState<string[]>(
    []
  );
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setFormState(initialState);
      setSelectedLandlords(landlords.length === 1 ? [landlords[0].id] : []);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);
    }
  }, [open, landlords]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const toggleLandlord = (id: string) => {
    setSelectedLandlords((prev) =>
      prev.includes(id)
        ? prev.filter((landlordId) => landlordId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formState.name.trim();
    const surfaceValue = Number(formState.surface);
    const rentValue = Number(formState.rentAmount);

    if (selectedLandlords.length === 0) {
      setError("Sélectionnez au moins un propriétaire.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        name: trimmedName,
        surface: surfaceValue,
        furnished: formState.furnished,
        rentAmount: rentValue,
        photoUrl: formState.photoUrl?.trim() || undefined,
        landlordIds: selectedLandlords,
      });
      onClose();
    } catch (submissionError) {
      console.error(submissionError);
      setError("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const noLandlords = landlords.length === 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Ajouter un nouveau bien"
      width={560}
      className="add-unit-modal"
    >
      <div className="add-unit-modal__body">
        <form className="add-unit-modal__form" onSubmit={handleSubmit}>
          {error ? <p className="add-unit-modal__error">{error}</p> : null}

          <label className="add-unit-modal__field">
            <span>Nom du bien</span>
            <input
              ref={firstInputRef}
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </label>

          <div className="add-unit-modal__grid">
            <label className="add-unit-modal__field">
              <span>Surface (m²)</span>
              <input
                type="number"
                min="1"
                name="surface"
                value={formState.surface}
                onChange={handleChange}
                required
              />
            </label>

            <label className="add-unit-modal__field">
              <span>Loyer (€/mois)</span>
              <input
                type="number"
                min="1"
                step="0.01"
                name="rentAmount"
                value={formState.rentAmount}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="add-unit-modal__field">
            <span>URL de la photo</span>
            <input
              type="url"
              name="photoUrl"
              placeholder="https://"
              value={formState.photoUrl}
              onChange={handleChange}
            />
          </label>

          <div className="add-unit-modal__field">
            <span>Propriétaires</span>
            <div className="add-unit-modal__landlords">
              {noLandlords ? (
                <p className="add-unit-modal__hint">
                  Aucun propriétaire disponible pour le moment.
                </p>
              ) : (
                landlords.map((landlord) => (
                  <label
                    key={landlord.id}
                    className="add-unit-modal__landlord-option"
                  >
                    <input
                      type="checkbox"
                      value={landlord.id}
                      checked={selectedLandlords.includes(landlord.id)}
                      onChange={() => toggleLandlord(landlord.id)}
                    />
                    <span>
                      {landlord.firstName} {landlord.lastName}
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="add-unit-modal__toggle">
            <Toggle
              checked={formState.furnished}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  furnished: event.target.checked,
                }))
              }
              label={formState.furnished ? "Meublé" : "Non meublé"}
            />
          </div>

          <div className="add-unit-modal__actions">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting || noLandlords}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUnitModal;
