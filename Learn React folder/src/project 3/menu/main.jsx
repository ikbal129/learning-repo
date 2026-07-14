import { useState } from "preact/hooks";

function Main(props) {

    return(
        <>
        <div className="containe">
            <div className="title-box">
            <h1 className="title-text h1">Quiz Cepat</h1>
            <p className="title-text p">Tes Wawasan kamu dalam 10 soal</p>
            </div>
            <div className="card">
                <h1 className="card-title">Quiz Pro</h1>
                <div className="btn-box">
                    <button className="play-btn" onClick={() => {
                        props.setMulai(true)
                    }} type="button">Mulai Quiz</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Main;