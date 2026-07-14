

function Notes(props) {
    return(
        <>
        <div className="box add" onClick={() => {
            props.setTambah(true);
            props.setColor("y");
        }}>
            <span className="plus">+</span>
            <p>Add Notes</p>
        </div>
        </>
    )
}

export default Notes;