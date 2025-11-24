
function ChemDetails() {
    return (
        <div className="mx-auto border rounded-md mt-5 p-5">
            <h3 className="text-2xl mb-5"> Chemical Details </h3>
            <div className="flex gap-10">
                <div>
                    <p className="mb-2 font-medium">inchi</p>
                    <p className="mb-2 font-medium">inchikey</p>
                    <p className="mb-2 font-medium">iupac Name</p>
                    <p className="mb-2 font-medium">TopoPSA</p>
                    <p className="mb-2 font-medium">Lipinski Failures</p>
                    <p className="mb-2 font-medium">H-Bond Acceptors</p>
                    <p className="mb-2 font-medium">H-Bond Donors</p>
                    <p className="mb-2 font-medium">rotable Bonds</p>
                </div>
                <div>
                    <p className="mb-2">1</p>
                    <p className="mb-2">1</p>
                    <p className="mb-2">1</p>
                    <p className="mb-2">1</p>
                    <p className="mb-2">1</p>
                    <p className="mb-2">1</p>
                    <p className="mb-2">1</p>
                    <p className="mb-2">1</p>
                </div>
            </div>
        </div>
    )
}

export default ChemDetails;