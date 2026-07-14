import { useState } from "preact/hooks";

function Mood() {
    const [angka, setAngka] = useState(0);
    const [mood, setMood] = useState("Datar aja");

    function ubahMood() {

        if (angka < 0) {
            setMood("Galau");
        }
        else if (angka > 0 && angka <= 5) {
            setMood("Senang");
        } else if (angka > 5) {
            setMood("Kebahagiaan Overload");
        } else {
            setMood("Datar aja");
        }
    }

    ubahMood()

    return(
        <>
        <p className="angka">{angka}</p>
        <button type="button" onClick={() => {setAngka(angka + 1)}}>Increase</button>
        <button type="button" onClick={() => {setAngka(0)}}>Reset</button>
        <button type="button" onClick={() => {setAngka(angka - 1)}}>Decrease</button>
        <p>Mood : {mood}</p>
        </>
    )
}

export default Mood;