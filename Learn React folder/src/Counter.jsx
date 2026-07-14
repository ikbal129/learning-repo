import { useState } from "preact/hooks"
import { useEffect } from "preact/hooks"

function Counter() {
    const [text, setText] = useState("");
    useEffect(() => {
        console.log("Woid")
        console.lo
    }, [])


    return(
        <>
        <h4>Belajar UseState</h4>
        <input type="text" onInput={(e) => {return setText(e.target.value)}} placeholder="tulis di sini"/>
        <p>Yang Anda Tulis : {text}</p>
        </>
    )
}

export default Counter;