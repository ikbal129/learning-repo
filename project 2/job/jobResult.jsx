function Job(props) {
    return(
        <>
        <div className="box">
            <p>{props.data.cName}</p>
            <p>{props.data.pos}</p>
            <p>{props.data.date}</p>
            <p>{props.data.desc}</p>
            <span className="btn">
                <button type="button" onClick={() => {
                    props.setJob(props.setShow("job"));
                }}>Back</button>
            </span>
        </div>
        </>
    )
}

export default Job;