import Card from "./card.jsx";
import { useState, useEffect } from "preact/hooks";
import { shuffle } from "./acak.js";
import GameStatus from "./status.jsx";
function Main() {
    const [data, setData] = useState([])
    const [clickedId, setClickedId] = useState([]);
    const [over, setOver] = useState(false);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [status, setStatus] = useState(false)
    const [popUp, setPopUp] = useState(false)

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=16");
                const data = await response.json();
                
                const detaiPromise = data.results.map(async (val) => {
                    const resDetail = await fetch(val.url);
                    const detail = await resDetail.json()
                    
                    return {
                        id: detail.id,
                        name: detail.name,
                        image: detail.sprites.front_default
                    };
                });
                const hasil = await Promise.all(detaiPromise);
                // console.log(hasil)
                setData(shuffle(hasil))
            } catch (error) {
                console.log("gagal ambil API");
            }
        }

        fetchPokemon()
    }, [])
    
    function addToList(id) {
        if (clickedId.includes(id)) {
            setOver(true)
            setPopUp(true)
            if (best < clickedId.length) {
                setBest(clickedId.length)
            }
            return
        }
        
        setData(shuffle(data))
        setClickedId(prev => [...prev, id])
        const nextScore = score + 1
        setScore(nextScore);
        
        if (nextScore == 16) {
            setOver(true)
            setPopUp(true)
            setStatus(true)
            setBest(16);
        } 
    }

    function reset() {
        setScore(0)
        setClickedId([]);
        setOver(false)
        setData(shuffle(data))
        setStatus(false)
    }

    // console.log(clickedId)

    return(<>
    <h1>Memory Game</h1>
    <p>Best Score : {best}</p>
    <p>Score : {score}</p>
    <Card add={addToList} over={over} data={data} clickedId={clickedId}/>
    {(over) && <GameStatus onReset={reset} popUp={popUp} setPopUp={setPopUp} status={status} jumlah={clickedId.length}/>}
    </>)
}

export default Main;