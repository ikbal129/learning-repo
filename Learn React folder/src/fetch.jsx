import { useState, useEffect } from "preact/hooks";

function Fecth() {
    const [source, setSource] = useState("");
    const [count, setCount] = useState(1);
    const [name, setName] = useState("");

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${count}`).then((res) => {
            return res.json();
        }).then((data) => {
            setSource(data.sprites.front_shiny)
            setName(data.name)
            // console.log(data)
        })
    }, [count])
    return(
        <>
        <h1>Hello API</h1>
        <img src={source} alt="gambar pikachu" /><br />
        <p>{name}</p>
        <button onClick={() => {
            setCount(count + 1)
        }}>Ganti</button>
        </>
    )
}

export default Fecth;