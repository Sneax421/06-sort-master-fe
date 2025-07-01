import type Item from "../common/types/Item.ts";
import {useState} from "react";
import CreateRemoveItem from "./CreateRemoveItem.tsx";
import type Container from "../common/types/Container.ts";
import {Link} from "react-router-dom";


interface Props {
    item: Item,
    container?: Container;
}

const ItemCard = ({item, container}: Props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);


    const handleRemove = (id: string) => {
        setMessage("Successfully deleted Item");
        setIsDeleted(true);
    };

    if (isDeleted) return null;

    return (
        <li
            className="relative p-4 rounded-lg shadow-md text-black border-2 transform transition-transform duration-200 hover:-translate-y-1"
            style={{backgroundColor: container?.color}}
        >
            {message ? <p className="text-green-400">{message}</p> : null}
            {deleteError ? <p className="text-red-400"> {deleteError}</p> : null}


            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-700">
                Container: {container ? container.name : "Unknown container"}
            </p>

            <CreateRemoveItem containerId={item.id} onRemove={handleRemove}/>

            <Link to={`/items/${item.id}`}>To item page</Link>


        </li>
    );
};

export default ItemCard;