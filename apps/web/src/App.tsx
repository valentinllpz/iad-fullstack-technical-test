import "./App.css";
import UnitList from "./components/UnitList";

const units = [
  {
    id: "1",
    name: "Unit 1",
  },
  {
    id: "2",
    name: "Unit 2",
  },
];

function App() {
  return (
    <>
      <div>
        <UnitList units={units} />
      </div>
    </>
  );
}

export default App;
