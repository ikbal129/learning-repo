function Card(props) {
    return(
        <>
        <div className="container">
            {props.data.map((val) => {
                return <div className="card" id={val.id} onClick={() => {
                    if (props.over) {
                        return;
                    }
                    props.add(val.id)
                }}><img src={val.image} alt={`gambar ${val.name}`}/>
                <p>{val.name}</p>
                {props.clickedId.includes(val.id) && <p>Sudah diklik</p>}
                </div>
            })}
        </div>
        </>
    )
}

export default Card;