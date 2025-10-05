import React from "react";
import { Button, Modal, Toggle } from "@repo/ui";

import "./styles.css";

interface AddUnitModalProps {
  open: boolean;
  onClose: () => void;
}

const initialState = {
  name: "",
  surface: "",
  rentAmount: "",
  photoUrl: "",
  landlords: "",
  furnished: true,
};

type FormState = typeof initialState;

const AddUnitModal = ({ open, onClose }: AddUnitModalProps) => {
  const [formState, setFormState] = React.useState<FormState>(initialState);
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setFormState(initialState);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submission", formState);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Ajouter nouveau un bien"
      width={560}
      className="add-unit-modal"
    >
      <form className="add-unit-modal__form" onSubmit={handleSubmit}>
        <div className="add-unit-modal__body">
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
                type="text"
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
              value={formState.photoUrl}
              onChange={handleChange}
            />
          </label>

          <label className="add-unit-modal__field">
            <span>Propriétaires (séparés par des virgules)</span>
            <input
              type="text"
              name="landlords"
              placeholder="Ex: Camille Dupont, Julien Martin"
              value={formState.landlords}
              onChange={handleChange}
            />
          </label>

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
        </div>

        <div className="add-unit-modal__actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUnitModal;
