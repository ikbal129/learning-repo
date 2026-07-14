import { useState } from "preact/hooks";

function SchoolForm(props) {
    const [name, setName] = useState(props.data?.name || "");
    const [major, setMajor] = useState(props.data?.major || "");
    const [date, setDate] = useState(props.data?.date || "");
    const [gpa, setGpa] = useState(props.data?.gpa || "");
    const key = "school";

    return(
        <div className="box">
            
            <label htmlFor="name">School Name : </label>
            <input type="text" name="name" id="name" placeholder="School Name" value={name} onInput={(e) => {
                setName(e.target.value);
            }}/>

            <label htmlFor="major">Major : </label>
            <input type="text" name="major" id="major" placeholder="Major" value={major} onInput={(e) => {
                setMajor(e.target.value);
            }}/>

            <label htmlFor="date">Date : </label>
            <input type="date" name="date" id="date" placeholder="Date" value={date} onInput={(e) => {
                setDate(e.target.value);
            }}/>

            <label htmlFor="gpa">Gpa : </label>
            <input type="text" name="gpa" id="gpa" placeholder="Gpa" value={gpa} onInput={(e) => {
                setGpa(e.target.value)
            }}/>

            <span className="btn">
                <button type="button" onClick={() => {
                    if (name.trim() != "" || major.trim() != "" || date.trim() != "" || gpa.trim() != "" ) {
                        const data = {
                            name: name,
                            major: major,
                            date: date,
                            gpa: gpa,
                            show: false
                        }
                        props.sendData(key, data)
                        props.setSchool(props.setShow(key));
                    }
                }}>Submit</button>
            </span>
        </div>
    )
}

export default SchoolForm;