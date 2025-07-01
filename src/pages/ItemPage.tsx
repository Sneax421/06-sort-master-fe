import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {ExtednedItem} from "../common/types/ExtednedItem.ts";


const ItemPage = () => {

    const {id} = useParams();
    const [item, setItem] = useState<ExtednedItem | undefined>(undefined);

    async function fetchItem(id: string | undefined) {
        const res = await fetch(`/api/items/extended/${id}`);
        if (!res.ok) {
            throw new Error("Failed to load item");
        }
        const itemRes = await res.json();
        setItem(itemRes);
    }


    useEffect(() => {
        fetchItem(id);
    }, [id]);

    return (
        <div>
            Item: {item?.name}{" "}
            <span style={{backgroundColor: item?.container?.color}}>
        Container: {item?.container?.name}
      </span>
        </div>
    );
}
export default ItemPage;
