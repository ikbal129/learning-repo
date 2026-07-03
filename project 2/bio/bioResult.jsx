function BioData(props) {
    return(
        <>
        <div className="box">
            <p>{props.data.fName}</p>
            <p>{props.data.lName}</p>
            <p>{props.data.email}</p>
            <p>{props.data.pNum}</p>
            <span className="btn">
                <button type="button" onClick={() => {
                    props.setData(props.setShow("bio"))
                }}>Back</button>
            </span>
        </div>
        </>
    )
}

export default BioData;