function School(props) {
    return(
        <>
        <div className="box">
            <p>{props.data.name}</p>
            <p>{props.data.major}</p>
            <p>{props.data.date}</p>
            <p>{props.data.gpa}</p>
            <span className="btn">
                <button type="button" onClick={() => {
                    props.setSchool(props.setShow("school"));
                }}>Back</button>
            </span>
        </div>
        </>
    )
}

export default School;