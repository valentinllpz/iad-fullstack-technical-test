import UnitCard from "../UnitCard";

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

const mockUnits: Unit[] = [
  {
    id: "1",
    name: "Studio Le Marais",
    surface: 28,
    furnished: true,
    rentAmount: "1150",
    photoUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    landlords: [
      { id: "1", firstName: "Camille", lastName: "Dupont" },
      { id: "2", firstName: "Julien", lastName: "Martin" },
    ],
  },
  {
    id: "2",
    name: "Duplex Canal Saint-Martin",
    surface: 76,
    furnished: false,
    rentAmount: "1980",
    photoUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    landlords: [{ id: "2", firstName: "Julien", lastName: "Martin" }],
  },
  {
    id: "3",
    name: "Loft Belleville",
    surface: 64,
    furnished: true,
    rentAmount: "1720",
    landlords: [
      { id: "2", firstName: "Julien", lastName: "Martin" },
      { id: "3", firstName: "Sophie", lastName: "Bernard" },
    ],
  },
];


const UnitList = () => {
  const handleDelete = (id: string) => {
    console.log(`Supprimer le bien ${id}`);
    // TODO: Implémenter la suppression
  };

  return (
    <div>
      <div className="unit-list">
        {mockUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default UnitList;
