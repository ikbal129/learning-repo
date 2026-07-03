import { useState } from "preact/hooks";

function Book(props) {
    const [nama, setNama] = useState("");
    const [author, setAuthor] = useState("");
    const cardBoxStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0"
    }

    const screenStyle = {
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, .4)",
        width: "100%",
        height: "100%",
    }

    const cardStyle = {
        position: "absolute",
        zIndex: "1",
        backgroundColor: "#f4f4f4",
        padding: "10px",
        borderRadius: "8px",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, 50%)",
        display: "flex",
        gap: "10px"
    }

    //fungsi input data ke local storage
    function addToStorage(data) {
        let getData = JSON.parse(localStorage.getItem("buku"));
        const dataBuku = {
            id: Date.now(),
            nama: data.namaBuku,
            author: data.namapenulis,
            status: false
        }

        getData.push(dataBuku);

        const newData = JSON.stringify(getData);
        localStorage.setItem("buku", newData);
    }
    return(
        <div className="card-box" style={cardBoxStyle}>
            <div className="screen" style={screenStyle} onClick={props.onTutup}></div>
            <div className="card" style={cardStyle}>
                <label htmlFor="nama">Nama Buku :</label>
                <input type="text" name="nama" id="nama" placeholder="masukkan..." value={nama} onInput={(e) => {
                    setNama(e.target.value)
                }}/>
                <label htmlFor="author">Nama Penulis : </label>
                <input type="text" name="author" id="author" placeholder="masukkan..." value={author} onInput={(e) => {
                    setAuthor(e.target.value)
                }}/>
                <button type="button" onClick={() => {
                    if (nama == "" || author == "") {
                        window.alert("tolong isi form");
                        return;
                    }

                    const data = {
                        namaBuku: nama,
                        namapenulis: author
                    }
                    addToStorage(data);
                    props.onTutup()
                    props.tambah();
                }}>Enter</button>
            </div>
        </div>
    )
}

export default Book;