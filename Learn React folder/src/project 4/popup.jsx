import { useState } from "preact/hooks";

function PopUp(props) {
    const [title, setTitle] = useState(props.isEdit ? props.title : "");
    const [isi, setIsi] = useState(props.isEdit ? props.text : "");

    const warna = ["🟡","🟠","🔴","🟢","🔵","🟣"]
    const nama = ["y", "o", "r", "g", "b", "p"]

    function kirimData(data) {
        const getData = JSON.parse(localStorage.getItem("notes"));
        for (let i = 0; i < getData.length; i++) {
            if (getData[i].id == data.id) {
                getData[i].title = data.title;
                getData[i].note = data.note;
                getData[i].color = data.color;
                localStorage.setItem("notes", JSON.stringify(getData));
                return;
            }
        }

        getData.push(data)
        localStorage.setItem("notes", JSON.stringify(getData));
    }

    return(
        <>
        <div className="popup">
            <div className="screen"></div>
            <div className={`form ${props.color}`}>
                <div className="notesHeader">
                    <input type="text" name="title" id="title" placeholder="Title..." value={title} onInput={(e) => {
                        setTitle(e.target.value);
                    }}/>
                    <span className="close" onClick={() => {
                        props.setTambah(false);
                        props.setIsEdit(false);
                    }}>❌</span>
                </div>
                <textarea value={isi} name="notes" id="notes" rows={20} cols={40} placeholder="Write your notes here..." onInput={(e) => {
                    setIsi(e.target.value);
                }}></textarea>
                <div className="notesFooter">
                    <button onClick={() => {
                        if (isi.length == 0 && title.length == 0) {
                            props.setTambah(false);
                            return;
                        }

                        const id = props.isEdit ? props.id : Date.now();

                        const data = {
                            id: id,
                            title: title,
                            note: isi,
                            color: props.color
                        }

                        kirimData(data);
                        props.setTambah(false);
                        props.setIsEdit(false)
                        props.setData(JSON.parse(localStorage.getItem("notes")))
                    }} className="sv-btn">Save</button>
                    <div className="color">
                        {warna.map((value, index) => {
                            return <span className="a" onClick={() => {
                                props.setColor(nama[index])
                            }}>{value}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PopUp;