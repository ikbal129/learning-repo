import { useState } from "preact/hooks";
import Main from "./menu/main.jsx";
import Quiz from "./quiz.jsx";
import Selesai from "./selesai.jsx";
import { QUESTIONS_DATA } from "./question.js";
import { shuffle } from "./shuffle.js";
const data = shuffle(QUESTIONS_DATA);

function Utama() {
    const [mulai, setMulai] = useState(false);
    const [index, setIndex] = useState(0);
    const [isDone, setDone] = useState(false);
    const [benar, setBenar] = useState(0);

    if (isDone == false) {
        return(
            <>
            {mulai ? <Quiz benar={benar} setBenar={setBenar} data={data} setDone={setDone} setIndex={setIndex} index={index}/> : <Main setMulai={setMulai}/>}
            </>
        )
    } else {
        return(
        <>
        <Selesai benar={benar}/>
        </>)
    }
}

export default Utama;