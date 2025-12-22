import { refFromDOIQuery } from "@/app/utils/compoundBuilderQuery";
import { fetchSingle } from "@/app/utils/fetch";
import { useEffect, useState } from "react";

type Props = {
    doi: string;
};

type ReferenceProperty = {
    title: { value: string };
    publicationYear?: { value: string };
    volume?: { value: string };
    issue?: { value: string };
    pages?: { value: string };
    publisher?: { value: string };
    periodicMagazine?: { value: string };
}

function RefDetails({ doi }: Props) {
    const [properties, setProperties] = useState<ReferenceProperty | null>(null);

    useEffect(() => {
    fetchSingle<ReferenceProperty>(refFromDOIQuery(doi))
        .then(setProperties)
        .catch(console.error);
    }, [doi]);

    return (
    <div className="m-5 mt-7">
        <p className="text-lg font-medium pb-2">Reference Information</p>
        <p className="pb-1"><span className="font-medium">Title: </span> {properties?.title?.value} </p>
        <p  className="pb-1"><span className="font-medium">Published in:</span> {properties?.publicationYear?.value}</p>
        <p className="pb-1"><span className="font-medium">Magazine: </span>{properties?.periodicMagazine?.value}</p>
        <p className="pb-1"><span className="font-medium">Volume:</span> {properties?.volume?.value}</p>
        <p className="pb-1"><span className="font-medium">Issue: </span>{properties?.issue?.value}</p>
        <p className="pb-1"><span className="font-medium">Pages: </span>{properties?.pages?.value}</p>
        <p className="pb-1" ><span className="font-medium">Publisher: </span>{properties?.publisher?.value}</p>
    </div>
    );
}

export default RefDetails;