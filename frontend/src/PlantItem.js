import { useState } from "react";

const PlantItem = (props) => {
  const { idx, plant, fetchPlants } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(plant.name);
  const [currentImgUrl, setCurrentImgUrl] = useState(plant.imgUrl);

  const handleDelete = () => {
    fetch(`http://localhost:3001/plants/${idx}`, {
      method: "DELETE",
    }).then(() => {
      fetchPlants();
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/plants/${idx}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: currentName, imgUrl: currentImgUrl }),
    }).then((response) => {
        console.log(response.status);
      fetchPlants();
      setIsEditing(false);
    });
  };

  return (
    <div key={idx} className="border border-zinc-400 m-2 p-2">
      {isEditing ? (
        <input
          className="border border-blue-300"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
        />
      ) : (
        <div>{plant.name}</div>
      )}
      <div onClick={handleDelete}>
        <i className="text-3xl text-red-500 cursor-pointer fa-solid fa-trash-can-xmark"></i>
      </div>
      <i
        className="text-3xl text-zinc-600 cursor-pointer fa-regular fa-pen-to-square"
        onClick={() => setIsEditing(!isEditing)}
      ></i>

      {isEditing ? (
        <button 
            className="bg-blue-400 text-white rounded-md px-4 py-1"
            onClick={handleSave}
        >
          SAVE
        </button>
      ) : null}
      <img className="w-40 h-40" src={plant.imgUrl} />
      {isEditing ? (
        <input
          className="border border-red-400"
          value={currentImgUrl}
          onChange={(e) => setCurrentImgUrl(e.target.value)}
        />
      ) : null}
    </div>
  );
};

export default PlantItem;
