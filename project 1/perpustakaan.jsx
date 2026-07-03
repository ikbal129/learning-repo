//bug : live rendering ganti status, live rendrering saat hapus, live rendering saat tambah

import Book from "./Book.jsx";
import { useState } from "preact/hooks";

function Perpustakaan() {
    
    if (localStorage.getItem("buku") == null) {
        localStorage.setItem("buku", "[]");
    }

    const [show, setShow] = useState(false);
    const [data, setData] = useState(() => {
        const dataLocal = JSON.parse(localStorage.getItem("buku")) || [];
        return dataLocal
    });
    const [filter, setFilter] = useState("all");

    function tampilkan() {
        setShow(true);
    }

    function ubahStatus(data) {
        let ambilData = JSON.parse(localStorage.getItem("buku"));

        for (let i = 0; i < ambilData.length; i++) {
            if (ambilData[i].id == data) {
                ambilData[i].status = !ambilData[i].status;
            }
        }
        setData(ambilData);
        localStorage.setItem("buku", JSON.stringify(ambilData));
    }

    function deleteBook(d) {
        const dataBaru = data.filter(buku => buku.id != d);
        setData(dataBaru)
        localStorage.setItem("buku", JSON.stringify(dataBaru));
    }

    const boxFilter = data.filter((buku) => {
        if (filter == "read") return buku.status == true;
        if (filter == "not-read") return buku.status == false;
        return true;
    })

    return(
        <>
        <select name="opsi" id="opsi" onChange={(e) => {
            setFilter(e.target.value)
        }}>
            <option value="all">Semua</option>
            <option value="read">Sudah Dibaca</option>
            <option value="not-read">Belum Dibaca</option>
        </select>
        <button type="button" onClick={tampilkan}>Tambah Buku</button>

        <ul>
            {boxFilter.map((value) => {
            return <li id={value.id} style={{listStyleType: "none"}}>{value.nama} - {value.author} <button type="button" onClick={(e) => {
                ubahStatus(e.target.parentElement.id);
            }}>{value.status ? "Sudah Baca": "Belum Baca"}</button> <button type="button" onClick={(e) => {
                deleteBook(e.target.parentElement.id)
            }}>Delete</button></li>
            })}
        </ul>

        {show && <Book onTutup={() => setShow(false)} tambah={() => {
            setData(JSON.parse(localStorage.getItem("buku")))
        }}/>}
        </>
    )
}

export default Perpustakaan;