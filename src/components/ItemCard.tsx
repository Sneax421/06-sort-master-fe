import type Item from "../common/types/Item.ts";
import {useState} from "react";
import CreateRemoveItem from "./CreateRemoveItem.tsx";


interface Props {
    item: Item;
}

const ItemCard = ({item}: Props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);


    const handleRemove = (id: string) => {
        setMessage("Successfully deleted Item");
        setIsDeleted(true);
    };

    if (isDeleted) return null;

    return (
        <li className="relative p-4 rounded-lg shadow-md bg-white text-black border-2 transform transition-transform duration-200 hover:-translate-y-1">

            {message ? <p className="text-green-400">{message}</p> : null}
            {deleteError ? <p className="text-red-400"> {deleteError}</p> : null}


            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">Container ID: {item.containerId}</p>

            <CreateRemoveItem containerId={item.id} onRemove={handleRemove} />


        </li>
    );
};

export default ItemCard;