function RefItem() {
    return(
        <div className="mx-auto border rounded-md p-5">
        <span className="p-10"> DOI </span> 
                                {/* oder titel...? überlegen was hier genau für daten hin sollen */}
        <span className="p-10"> Species </span>
        <span className="p-10"> State </span>
        <span className="p-10"> City </span>
        </div>
    )
}

export default RefItem;