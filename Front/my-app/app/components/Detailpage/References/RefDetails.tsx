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
        <p className="text-xl pb-3">Reference Information</p>
            <div className="grid grid-cols-2 gap-y-1">
                <p className="font-medium">Title: </p> <p> {properties?.title?.value} </p>
                <p className="font-medium">Published in: </p> <p> {properties?.publicationYear?.value}</p>
                <p className="font-medium">Magazine: </p> <p>{properties?.periodicMagazine?.value}</p>
                <p className="font-medium">Volume:</p> <p> {properties?.volume?.value}</p>
                <p className="font-medium">Issue: </p> <p>{properties?.issue?.value}</p>
                <p className="font-medium"> Pages:</p> <p> {properties?.pages?.value}</p>
                <p className="font-medium"> Publisher:</p> <p> {properties?.publisher?.value}</p>
            </div>
    </div>
    );
}

export default RefDetails;