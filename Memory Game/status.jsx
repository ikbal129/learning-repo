function GameStatus(props) {
    return(
        <>
        {props.popUp && <div className="status">
            <div className="screen"></div>
            <div className="status-card">
                <h1>Kamu {props.status ? "Menang" : "Kalah"}</h1>
                <p>kamu berhasil mengingat {props.jumlah} pokemon dan {16 - props.jumlah} pokemon dilupakan <br/><br />klik OK untuk melanjutkan</p>
                <span className="btn-box">
                    <button className="close-btn" onClick={() => {
                        props.setPopUp(false)
                    }
                }>OK</button>
                </span>
            </div>
        </div>}
        <div className="play-again">
            <button className="play-btn" onClick={() => props.onReset()}>Main Lagi</button>
        </div>
        </>
    )
}

export default GameStatus