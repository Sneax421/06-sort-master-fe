import React, { useEffect, useState } from "react";

interface Container {
  id: string;
  color: string;
  name: string;
  description: string;
}

const ContainerList = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/containers")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(setContainers)
      .catch(setError);
  }, []);

  const handleRemove = (id: string) => {
      fetch(`/api/containers/${id}`, {
          method: "DELETE",
      })
          .then((res) => {
              if (!res.ok) throw new Error("Failed to delete container");
              setContainers((prevState) => prevState.filter(container => container.id !== id));
              setMessage("Container deleted");
          })
          .catch(() => setError("Failed to delete container"));
  }

  if (error)
    return <div className="text-red-500">Error loading containers.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
        {message && <div className="text-green-600 mb-2">{message}</div>}
      <ul className="space-y-4">
        {containers.map((container: Container) => (
          <li
            key={container.id}
            className="relative p-4 rounded-lg shadow-md text-white"
            style={{ backgroundColor: container.color }}
          >
              <button onClick={() => handleRemove(container.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-sm rounded">
                  Remove
              </button>
            <h3 className="text-xl font-semibold">{container.name}</h3>
            <p>{container.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContainerList;


