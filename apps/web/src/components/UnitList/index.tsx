import React from "react";

import UnitCard from "../UnitCard";
import AddUnitCard from "../AddUnitCard";
import AddUnitModal from "../AddUnitModal";

import {
  createUnit,
  deleteUnit,
  fetchLandlords,
  fetchUnits,
  type CreateUnitPayload,
  type LandlordDto,
  type UnitDto,
} from "../../lib/api";

import "./styles.css";

const UnitList = () => {
  const [units, setUnits] = React.useState<UnitDto[]>([]);
  const [landlords, setLandlords] = React.useState<LandlordDto[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pendingDeletion, setPendingDeletion] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [unitsResponse, landlordsResponse] = await Promise.all([
          fetchUnits(),
          fetchLandlords(),
        ]);
        setUnits(unitsResponse);
        setLandlords(landlordsResponse);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : "Impossible de récupérer les données.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateUnit = async (payload: CreateUnitPayload) => {
    const newUnit = await createUnit(payload);
    setUnits((prev) => [newUnit, ...prev]);
  };

  const handleDelete = async (id: string) => {
    try {
      setPendingDeletion(id);
      await deleteUnit(id);
      setUnits((prev) => prev.filter((unit) => unit.id !== id));
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Impossible de supprimer le bien.";
      alert(message);
    } finally {
      setPendingDeletion(null);
    }
  };

  const handleOpenModal = () => {
    if (landlords.length === 0) {
      alert("Ajoutez d'abord un propriétaire avant de créer un bien.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div>
      {error ? <p className="unit-list__error">{error}</p> : null}
      {loading ? (
        <p className="unit-list__loading">Chargement des biens...</p>
      ) : (
        <div className="unit-list">
          <AddUnitCard onClick={handleOpenModal} />
          {units.length === 0 ? (
            <p className="unit-list__empty">Aucun bien enregistré pour le moment.</p>
          ) : (
            units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                onDelete={handleDelete}
                isDeleting={pendingDeletion === unit.id}
              />
            ))
          )}
        </div>
      )}

      <AddUnitModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        landlords={landlords}
        onSubmit={handleCreateUnit}
      />
    </div>
  );
};

export default UnitList;
