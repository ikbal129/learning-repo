import PopUp from "./popup.jsx";

function CreateNote(props) {
    const hari = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const tanggal = new Date();

    function deleteNotes(id) {
        const getData = JSON.parse(localStorage.getItem("notes"));
        const newData = getData.filter(val => val.id != id);
        localStorage.setItem("notes", JSON.stringify(newData));
    }

    return(
    <>
    <div className={`box ${props.color}`}>
        <div className="note-box">
            <div className="notesHeader">
                <h1 className="card-title">{props.title}</h1>
                <span className="delete" onClick={() => {
                    deleteNotes(props.id);
                    props.setData(JSON.parse(localStorage.getItem("notes")))
                }}>🗑</span>
            </div>
            <p className="sticky-content">{props.note}</p>
        </div>
        <div className="notesFooter">
            <p className="card-date">{`${hari[tanggal.getDay()]} ${tanggal.getDate()}, ${tanggal.getFullYear()}`}</p>
            <span className="edit" onClick={() => {
                props.setColor(props.color)
                props.setIsEdit(true);
                props.setTitle(props.title)
                props.setText(props.note);
                props.setId(props.id)
                props.setTambah(true);
            }}>✏</span>
        </div>
    </div>
    </>)
}

export default CreateNote;