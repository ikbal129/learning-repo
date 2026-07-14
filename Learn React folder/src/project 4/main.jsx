import { useState } from "preact/hooks";
import Notes from "./notes.jsx"
import CreateNote from "./note.jsx";
import PopUp from "./popup.jsx";
import Navbar from "./navbar.jsx";


function Main() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("notes")));
    const [tambah, setTambah] = useState(false);
    const [title, setTitle] = useState(null);
    const [text, setText] = useState(null)
    const [color, setColor] = useState("y");
    const [id, setId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);


    if (data == null ) {
        localStorage.setItem("notes", "[]");
    }
        
    return (
        <>
        <Navbar />
        <div className="content">
            <div className="container">
                {data.map((value) => {
                    return <CreateNote setData={setData} setId={setId} setIsEdit={setIsEdit} setTitle={setTitle} setText={setText} setTambah={setTambah} id={value.id} tambah={tambah} title={value.title} note={value.note} setColor={setColor} color={value.color}/>
                })}
                <Notes setColor={setColor} text={text} setTambah={setTambah} data={data} tambah={tambah} setData={setData}/>
            </div>
            {tambah && <PopUp setColor={setColor} color={color} id={id} text={text} title={title} setIsEdit={setIsEdit} isEdit={isEdit} setData={setData} setTambah={setTambah}/>}
        </div>
        </>
    )
}

export default Main;