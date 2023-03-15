import {useEffect, useState} from 'react';
import PlantItem from "./PlantItem";

const App = () => {
  const [plants, setPlants] = useState([]);

  const fetchPlants = () => {
    fetch("http://localhost:3001/plants")
      .then(response => response.json())
      .then(data => setPlants(data));
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  const plantItems = plants.map((plant, idx) => {
    return <PlantItem key={idx} idx={idx} plant={plant} fetchPlants={fetchPlants}/>
  })

  return (
    <div>
      {plantItems}
    </div>
  );
}

export default App;
