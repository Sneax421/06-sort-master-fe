import React, {useEffect, useState} from "react";
import ItemCard from "./ItemCard.tsx";
import type Item from "../common/types/Item.ts";
import type Container from "../common/types/Container.ts";


const ItemList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [containers, setContainers] = useState<Container[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch("/api/items").then(res => res.json()),
            fetch("/api/containers").then(res => res.json())
        ])
            .then(([itemsData, containersData]) => {
                setItems(itemsData);
                setContainers(containersData);
            })
            .catch(setError);
    }, []);

    const getContainerById = (id: string) =>
        containers.find(c => c.id === id);


    if (error)
        return <div className="text-red-500">Failed to loading Items.</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Items</h2>
            <ul className="space-y-4">
                {items.map(item => {
                    const container = getContainerById(item.containerId);
                    return (
                        <ItemCard key={item.id} item={item} container={container}/>
                    );
                })}
            </ul>
        </div>
    );
};

export default ItemList;


