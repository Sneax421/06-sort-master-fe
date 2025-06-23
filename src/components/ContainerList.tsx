import React, {useEffect, useState} from "react";
import type Container from "../common/types/Container.ts";
import ContainerCard from "./ContainerCard.tsx";


const ContainerList = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [error, setError] = useState(null);
    // const [message, setMessage] = useState<string | null>(null);
    // const [deleteError, setDeleteError] = useState(null);
    // const [items, setItems] = useState<{[key: string]: string}>({});

    useEffect(() => {
        fetch("/api/containers")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(setContainers)
            .catch(setError);
    }, []);

    // async function handleRemove(id: string) {
    //     const res = await fetch(`/api/containers/${id}`, {method: "DELETE"});
    //     try {
    //         if (!res.ok) {
    //             throw new Error("Failed to delete container");
    //         }
    //         setMessage("Successfully deleted container");
    //         setContainers((prev) => prev.filter((c) => c.id !== id));
    //     } catch (err) {
    //         setMessage(null);
    //         setDeleteError(err.message);
    //     }
    // }

    // const handleInput = (containerId: string, value: string) => {
    //     setItems((prev) => ({ ...prev, [containerId]: value }));
    // };

    // async function handleAddItem(containerId: string) {
    //     const name = items[containerId];
    //     if (!name) {
    //         return;
    //     }
    //
    //     try {
    //         const response = await fetch("/api/items", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "*/*",
    //             },
    //             body: JSON.stringify({
    //                 name: name,
    //                 containerId: parseInt(containerId),
    //             }),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error("Failed to add item");
    //         }
    //
    //         setMessage("Item added to container " + containerId + "!");
    //         const updatedItems = Object.assign({}, items);
    //         updatedItems[containerId] = "";
    //         setItems(updatedItems);
    //
    //     } catch (error) {
    //         setMessage("Error adding item.");
    //     }
    // }


    if (error)
        return <div className="text-red-500">Error loading containers.</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
            {/*{message ? <p className="text-green-400">{message}</p> : null}*/}
            {/*{deleteError ? <p className="text-red-400"> {deleteError}</p> : null}*/}
            <ul className="space-y-4">
                {containers.map((container: Container) => (
                 <ContainerCard container={container}/>
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;


