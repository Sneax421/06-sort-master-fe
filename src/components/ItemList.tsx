import React, {useEffect, useState} from "react";
import ItemCard from "./ItemCard.tsx";
import type Item from "../common/types/Item.ts";


const ItemList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/items")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                setError(err.message);
                console.error("FETCH ERROR:", err);
            });
    }, []);



    if (error)
        return <div className="text-red-500">Error loading containers.</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Items</h2>
            <ul className="space-y-4">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item}  />
                ))}
            </ul>
        </div>
    );
};

export default ItemList;


