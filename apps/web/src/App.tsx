import Layout from "./components/Layout";
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
    <Layout>
      <UnitList units={units} />
    </Layout>
  );
}

export default App;
