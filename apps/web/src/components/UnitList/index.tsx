import UnitCard from "../UnitCard";

import "./styles.css";

interface Unit {
  id: string;
  name: string;
}

const UnitList = ({ units }: { units: Unit[] }) => {
  return (
    <div className="unit-list">
      {units.map((unit) => (
        <UnitCard key={unit.id}>
          <h3>{unit.name}</h3>
          <p>Lorem ipsum dolor sit amet</p>
        </UnitCard>
      ))}
    </div>
  );
};

export default UnitList;
