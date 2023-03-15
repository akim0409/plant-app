import {useEffect, useState} from 'react';

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
    return <div 
      key={idx}
      className="border border-zinc-400 m-2 p-2"
    >
      <div>{plant.name}</div>
      <div 
        onClick={() => {
          fetch(`http://localhost:3001/plants/${idx}`, {
            method: 'DELETE'
          })
          .then(() => {
            fetchPlants();
          })
        }}
      >
        <i className="text-3xl text-red-500 cursor-pointer fa-solid fa-trash-can-xmark"></i>
      </div>
      <img
        className='w-40 h-40'
        src={plant.imgUrl}
      />
    </div>
  })

  return (
    <div>
      {plantItems}
    </div>
  );
}

export default App;
