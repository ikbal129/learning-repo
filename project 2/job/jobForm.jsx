import { useState } from "preact/hooks";

function JobForm(props) {
    const [cName, setCname] = useState(props.data?.cName || "");
    const [pos, setPos] = useState(props.data?.pos || "");
    const [date, setDate] = useState(props.data?.date || "");
    const [desc, setDesc] = useState(props.data?.desc || "");
    const key = "job";

    return(
        <div className="box">
            
            <label htmlFor="cName">Company Name : </label>
            <input type="text" name="cName" id="cName" placeholder="Company Name" value={cName} onInput={(e) => {
                setCname(e.target.value);
            }}/>

            <label htmlFor="pos">Position : </label>
            <input type="text" name="pos" id="pos" placeholder="Position" value={pos} onInput={(e) => {
                setPos(e.target.value);
            }}/>

            <label htmlFor="date">Date : </label>
            <input type="date" name="date" id="date" placeholder="Date" value={date} onInput={(e) => {
                setDate(e.target.value);
            }}/>

            <label htmlFor="desc">Description : </label>
            <textarea name="desc" id="desc" cols="30" placeholder="Job Description / Company Description" rows="10" value={desc} onInput={(e) => {
                setDesc(e.target.value);
            }}></textarea>

            <span className="btn">
                <button type="button" onClick={() => {
                    if (cName.trim() != "" || pos.trim() != "" || date.trim() != "" || desc.trim() != "" ) {
                        const data = {
                            cName: cName,
                            pos: pos,
                            date: date,
                            desc: desc,
                            show: false
                        }
                        props.sendData(key, data)
                        props.setJob(props.setShow(key));
                    }
                }}>Submit</button>
            </span>
        </div>
    )
}

export default JobForm;