import React, {useEffect, useState} from "react";
import type Container from "../common/types/Container.ts";
import ContainerCard from "./ContainerCard.tsx";


const ContainerList = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/containers")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(setContainers)
            .catch(setError);
    }, []);


    if (error)
        return <div className="text-red-500">Error loading containers.</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>

            <ul className="space-y-4">
                {containers.map((container: Container) => (
                 <ContainerCard container={container}/>
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;


