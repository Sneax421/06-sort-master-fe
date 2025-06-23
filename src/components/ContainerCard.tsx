import type Container from "../common/types/Container.ts";
import CreateItemForm from "./CreateItemForm.tsx";
import CreateRemoveForm from "./CreateRemoveForm.tsx";
import {useState} from "react";


interface Props{
    container: Container;
}

const ContainerCard = ({container} : Props) => {

    const [message, setMessage] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleRemove = (id: string) => {
        setMessage("Successfully deleted container");
        setIsDeleted(true);
    };

    if (isDeleted) return null;

    return (
        <li
            key={container.id}
            className="relative p-4 rounded-lg shadow-md text-white"
            style={{backgroundColor: container.color}}
        >
            {message ? <p className="text-green-400">{message}</p> : null}
            {deleteError ? <p className="text-red-400"> {deleteError}</p> : null}

            <h3 className="text-xl font-semibold">{container.name}</h3>
            <p>{container.description}</p>

            <CreateItemForm containerId={container.id} />
            <CreateRemoveForm containerId={container.id} onRemove={handleRemove} />


        </li>
    );
};

export default ContainerCard;