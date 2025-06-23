import {useState} from "react";

interface Props {
    containerId: string;
    onRemove: (id: string) => void;
}

const CreateRemoveForm = ({containerId, onRemove}: Props) => {

    const [error, setError] = useState<string | null>(null);

    async function handleRemove() {

        const res = await fetch(`/api/items/${containerId}`,
            {method: "DELETE"});
        try {
            if (!res.ok) {
                throw new Error("Failed to delete container");
            }
            onRemove(containerId);
        } catch (err: any) {
            setError(err.message);
        }
    }


    return (
        <>
            {error && <p className="text-red-400">{error}</p>}

            <button onClick={handleRemove}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-sm rounded">
                Remove
            </button>
        </>
    );
};

export default CreateRemoveForm;
