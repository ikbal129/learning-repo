function Selesai(props) {
    return(
        <>
        <div className="container">
            <h1 className="done-title">Quiz<br />Selesai!</h1>
            <div className="done-card">
                <div className="question-header">
                    <div className="progress-bar">
                        <progress max={100} value={`100`}></progress>
                    </div>
                    <span>Soal 10/10</span>

                    <div className="status-box">
                        <h1 className="jumlah-benar">{props.benar}/10</h1>
                        <h1 className="status">Benar</h1>
                    </div>
                    
                    <div className="complete-box">
                        <div className="complete">
                            <p className="benar">✅    Benar: {props.benar}</p>
                            <p className="salah">❌    Salah: {10 - props.benar}</p>
                        </div>
                        <div className="percentage">{props.benar * 10}%</div>
                    </div>
                </div>
            </div>

            <div className="back">
                <button className="back-btn" onClick={() => {
                    window.location.reload();
                }}>Kembali ke Main Menu</button>
            </div>
        </div>
        </>
    )
}

export default Selesai;