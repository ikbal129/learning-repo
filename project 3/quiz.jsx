import { useState } from "preact/hooks";

function Quiz(props) {
    const [next, setNext] = useState(false);
    const [isAnswer, setIsAnswer] = useState(false);
    const [status, setStatus] = useState("");
    const [progress, setProgress] = useState(0);
    let text = "";
    let nextBtn;

    function cekJawbana(jawaban) {
        const jawabanBenar = props.data[props.index].correctAnswer
        
        if (jawaban == jawabanBenar) {
            props.setBenar((props.benar + 1))
        }
    }
    
    
    if (props.index == 9) {
        text = "Selesai";
        nextBtn = <button className="next-btn" onClick={() => {
            props.setDone(true);
            props.setIndex((props.index + 1));
        }}>{text}</button>
    } else {
        text = "Next Quiz"
        nextBtn = <button className="next-btn" onClick={() => {
            props.setIndex((props.index + 1));
            setNext(false);
            setIsAnswer(false);
        }}>{text}</button>
    }

    return(
        <>
        <div className="container">
            <div className="quiz-card">
                <h1>Quiz Pro</h1>

                <div className="question-header">
                    <div className="progress-bar">
                        <progress max={100} value={`${progress}0`}></progress>
                    </div>
                    <span>Soal {props.index + 1}/10</span>
                </div>

                <h2 className="question">{props.data[props.index].question}</h2>

                <div className="answer">
                    {props.data[props.index].options.map((value) => {
                        let stats = "";
                        if (isAnswer) {
                            if (value == props.data[props.index].correctAnswer) {
                                stats = "correct";
                            } else if (value == status) {
                                stats = "wrong"
                            }
                        }

                        return <button className={`answer-btn ${stats}`} onClick={
                            () => {
                                cekJawbana(value)
                                setNext(true)
                                setIsAnswer(true)
                                setStatus(value);
                                setProgress(progress + 1)
                            }
                        } disabled={isAnswer}>
                            <span className="option-text">{value}</span>
                            <span className="arrow">{">"}</span>
                        </button>
                    })}
                    <span className="next-btn-box">
                        {next && nextBtn}
                    </span>
                </div>
            </div>
        </div>
        </>
    )
}

export default Quiz