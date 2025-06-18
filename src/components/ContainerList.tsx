import React, {useEffect, useState} from "react";

interface Container {
    id: string;
    color: string;
    name: string;
    description: string;
}

const ContainerList = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState(null);
    const [items, setItems] = useState<{[key: string]: string}>({});

    useEffect(() => {
        fetch("/api/containers")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(setContainers)
            .catch(setError);
    }, []);

    async function handleRemove(id: string) {
        const res = await fetch(`/api/containers/${id}`, {method: "DELETE"});
        try {
            if (!res.ok) {
                throw new Error("Failed to delete container");
            }
            setMessage("Successfully deleted container");
            setContainers((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            setMessage(null);
            setDeleteError(err.message);
        }
    }

    const handleInput = (containerId: string, value: string) => {
        setItems((prev) => ({ ...prev, [containerId]: value }));
    };

    async function handleAddItem(containerId: string) {
        const name = items[containerId];
        if (!name) {
            return;
        }

        try {
            const response = await fetch("/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
                body: JSON.stringify({
                    name: name,
                    containerId: parseInt(containerId),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add item");
            }

            setMessage("Item added to container " + containerId + "!");
            const updatedItems = Object.assign({}, items);
            updatedItems[containerId] = "";
            setItems(updatedItems);

        } catch (error) {
            setMessage("Error adding item.");
        }
    }


    if (error)
        return <div className="text-red-500">Error loading containers.</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
            {message ? <p className="text-green-400">{message}</p> : null}
            {deleteError ? <p className="text-red-400"> {deleteError}</p> : null}
            <ul className="space-y-4">
                {containers.map((container: Container) => (
                    <li
                        key={container.id}
                        className="relative flex flex-col p-4 rounded-lg shadow-md text-white"
                        style={{backgroundColor: container.color}}
                    >
                        <button onClick={() => handleRemove(container.id)}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-sm rounded">
                            Remove
                        </button>

                        <h3 className="text-xl font-semibold">{container.name}</h3>
                        <p>{container.description}</p>

                        <div className="mb-2 mt-auto space-y-2">
                            <input
                                type="text"
                                placeholder="Add item"
                                value={items[container.id] || ""}
                                onChange={(e) => handleInput(container.id, e.target.value)}
                                className="mt-3 w-full p-2 rounded text-black"/>
                            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                                    onClick={() => handleAddItem(container.id)}>
                                Add item
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;


