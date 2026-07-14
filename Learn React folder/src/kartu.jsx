function Kartu(props) {
    return(
        <div className="card-bg">
            <div className="card">
                <h2>{props.name}</h2>
                <p>Is a {props.peran}</p>
                <p>Best at {props.skill}</p>
            </div>
        </div>
    );
}

export default Kartu;