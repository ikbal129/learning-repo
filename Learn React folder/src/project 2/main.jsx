import BioForm from "./bio/bioForm.jsx";
import BioData from "./bio/bioResult.jsx";
import SchoolForm from "./school/schoolForm.jsx";
import School from "./school/schoolResult.jsx";
import JobForm from "./job/jobForm.jsx";
import Job from "./job/jobResult.jsx";
import { useState } from "preact/hooks";

function Main() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("bio")));
    const[school, setSchool] = useState(JSON.parse(localStorage.getItem("school")));
    const [job, setJob] = useState(JSON.parse(localStorage.getItem("job")));

    function setShow(key) {
        let getData = JSON.parse(localStorage.getItem(key));
        getData.show = !getData.show;
        localStorage.setItem(key, JSON.stringify(getData))
        return getData;
    }

    function sendData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    const titleStyle = {textAlign: "center"};
    return(
        <div className="container">
        <span>
            <h3 style={titleStyle}>Biodata</h3>
            {(data != null && data.show) ? <BioData setData={setData} data={data} setShow={setShow}/> : <BioForm setData={setData} sendData={sendData} setShow={setShow} data={data}/>}
        </span>
        <span>
            <h3 style={titleStyle}>School</h3>
            {(school != null && school.show) ? <School setSchool={setSchool} data={school} setShow={setShow}/> : <SchoolForm setSchool={setSchool} sendData={sendData} setShow={setShow} data={school}/>}
        </span>
        <span>
            <h3 style={titleStyle}>Job Experience</h3>
            {(job != null && job.show) ? <Job data={job} setJob={setJob} setShow={setShow}/> : <JobForm setJob={setJob} sendData={sendData} setShow={setShow} data={job}/>}
        </span>
        </div>
    )
}

export default Main;