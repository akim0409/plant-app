import { useState } from "react";

const PlantItem = (props) => {
  const { idx, plant, fetchPlants } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(plant.name);
  const [currentImgUrl, setCurrentImgUrl] = useState(plant.imgUrl);
  const [isSaving, setIsSaving] = useState(false);

  const handleDelete = () => {
    fetch(`http://localhost:3001/plants/${idx}`, {
      method: "DELETE",
    }).then(() => {
      fetchPlants();
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    fetch(`http://localhost:3001/plants/${idx}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: currentName, imgUrl: currentImgUrl }),
    }).then(() => {
      setIsSaving(false);
      fetchPlants();
      setIsEditing(false);
    });
  };

  return (
    <div
      key={idx}
      className="w-[320px] m-[20px] flex flex-col justify-center items-center rounded-lg bg-emerald-800"
    >
      <div className="flex justify-center items-center py-4">
        <i
          onClick={handleDelete}
          className="mx-4 text-2xl text-orange-500 cursor-pointer fa-solid fa-trash-can-xmark"
        ></i>

        {isEditing ? (
          <input
            className="rounded-md bg-emerald-200 font-josefin font-semibold text-center text-xl text-emerald-800 py-1"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
          />
        ) : (
          <div className="text-emerald-300 text-3xl text-center font-josefin font-semibold">
            {plant.name}
          </div>
        )}

        <i
          className="mx-4 text-2xl text-emerald-600 cursor-pointer fa-regular fa-pen-to-square"
          onClick={() => setIsEditing(!isEditing)}
        ></i>
      </div>
      {isEditing ? (
        <div className="flex flex-col justify-center items-center">
          <input
            className="rounded-md bg-emerald-200 text-center text-emerald-800 text-xl px-2 py-1"
            value={currentImgUrl}
            onChange={(e) => setCurrentImgUrl(e.target.value)}
          />
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-400 text-white text-sm rounded-md px-2 py-1 my-3"
              onClick={handleSave}
            >
              SAVE
            </button>
            {isSaving ? (
              <i className="mx-2 animate-spin text-emerald-300 text-xl fa-regular fa-spinner-third"></i>
            ) : null}
          </div>
        </div>
      ) : null}

      <img
        className="rounded-b-lg w-full h-full object-cover"
        src={plant.imgUrl}
      />
    </div>
  );
};

export default PlantItem;
