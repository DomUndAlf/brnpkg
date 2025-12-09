function Overview({ data }: { data: unknown }) {
    return (
    <div className="m-5 mx-auto border rounded-md p-5">
        <h3 className="pb-3 text-2xl"> Overview </h3>
        <div className="flex gap-10">
            <div>
                <p className="mb-2 font-medium">p</p>
                <p className="mb-2 font-medium">Class</p>
                <p className="mb-2 font-medium">Super Class</p>
            </div>
            <div>
                <p className="mb-2">1</p>
                <p className="mb-2">1</p>
                <p className="mb-2">1</p>
            </div>
        </div>
    </div>);
}

export default Overview;