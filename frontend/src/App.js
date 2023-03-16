import { useEffect, useState } from "react";
import PlantItem from "./PlantItem";

const App = () => {
  const [plants, setPlants] = useState([]);

  const fetchPlants = () => {
    fetch("http://localhost:3001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const plantItems = plants.map((plant, idx) => {
    return (
      <PlantItem key={idx} idx={idx} plant={plant} fetchPlants={fetchPlants} />
    );
  });

  return (
    <div className="min-h-screen bg-emerald-100 flex justify-center">
      <div className="flex flex-wrap max-w-[1080px]">{plantItems}</div>
    </div>
  );
};

export default App;
