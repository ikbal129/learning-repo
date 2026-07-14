import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import style from "../styling/Post.module.css"

function JobForm({ setIsSend, dataHandle }) {
    const [jobData, setJobData] = useState({
        tag: "",
        tagClass: "",
        title: "",
        desc: "",
        time: "",
        location: "",
        salary: {
            min: "",
            max: ""
        }
    });
    const [card, setCard] = useState(<Card />);
    const [office, setOffice] = useState(false);
    const [hybrid, setHybrid] = useState(false);

    useEffect(() => {
        setCard(<Card tag={jobData.tag} tagClass={jobData.tagClass} title={jobData.title} text={jobData.desc} location={hybrid ? `Hybrid(${jobData.location})` : jobData.location}
        time={jobData.time} salary={`$${jobData.salary.min}-${jobData.salary.max}k`} details="jobs-detail-ui" pages="jobs-pages-ui"/>)
    }, [jobData])

    const tagHandle = (event) => {
        const value = event.target.value;
        let result = "";
        let color = "";
        switch (value) {
            case "e":
                result = "Engginering";
                color = "yellow";
                break;
            case "d":
                result = "Design";
                color = "purple";
                break;
            case "m":
                result = "Marketing";
                color = "purple";
                break;
            case "s":
                result = "Support";
                color = "green";
                break;
            case "p":
                result = "Product";
                color = "purple";
                break;
            case "ds":
                result = "Data Science";
                color = "green";
                break;
        }
        setJobData({
            ...jobData, tag: result, tagClass: color
        });
    }

    const timeHandle = (event) => {
        const value = event.target.value;
        let result = "";

        switch (value) {
            case "full":
                result = "Full Time";
                break;
            case "part":
                result = "Part Time";
                break;
            case "contract":
                result = "Contract";
                break;
            case "intern":
                result = "Internship";
                break
        }

        setJobData({...jobData, time: result});
    }

    const locationHandle = (event) => {
        const value = event.target.value;
        if (value == "remote") {
            setHybrid(false);
            setOffice(false)
            setJobData({...jobData, location: "Remote"});
        } else if (value == "in-office") {
            setJobData({...jobData, location: ""});
            setHybrid(false);
            setOffice(true);
        } else if (value == "hybrid") {
            setJobData({...jobData, location: ""});
            setOffice(false);
            setHybrid(true);
        }
    }

    const officeLocation = <div className="input-office">
        <label htmlFor="location" className={style.formGroup}>Address :</label>
        <input type="text" name="locat" id="location" maxLength={50} placeholder="Office Address"
        value={jobData.location} onChange={(e) => setJobData({...jobData, location: e.target.value})}
        className={style.formControl}/>
    </div>

    const hybridLocation = <div className="input-hybrid">
        <label htmlFor="location" className={style.formGroup}>Address (Hybrid) :</label>
        <input type="text" name="locat" id="location" maxLength={50} placeholder="Office Address"
        value={jobData.location} onChange={(e) => setJobData({...jobData, location: e.target.value})}
        className={style.formControl}/>
    </div>

    return (
        <div>
            <div className="card-top-pages">{card}</div>
            <div className={style.formCard}>
                <div className={style.formGroup}>
                    <label htmlFor="tag" className={style.formGroup}>Tag :</label>
                    <select name="tag" id="tag" className={style.formControl} onChange={tagHandle}>
                        <option value="" disabled selected>-- Choose Tag</option>
                        <option value="e">Engineering</option>
                        <option value="d">Design</option>
                        <option value="m">Marketing</option>
                        <option value="s">Support</option>
                        <option value="p">Product</option>
                        <option value="ds">Data Science</option>
                    </select>
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="title" className={style.formGroup}>Title :</label>
                    <input type="text" name="title" id="title" maxLength={55} placeholder="Jobs Title..."
                    value={jobData.title} onChange={(e) => setJobData({...jobData, title: e.target.value})}
                    className={style.formControl}/>
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="desc" className={style.formGroup}>Description :</label>
                    <textarea name="desc" id="desc" placeholder="Jobs Desciption..." value={jobData.desc}
                    onChange={(e) => setJobData({...jobData, desc: e.target.value})} maxLength={2000}
                    rows={5} className={style.formControl}></textarea>
                </div>

                <div className={style.formGroup}>
                    <label>Job Schedule : </label>
                    <div className={style.radioGroup}>
                        <label className={style.radioLabel}>
                            <input className={style.formControl} type="radio" name="job-type" id="full-time" value="full" onChange={timeHandle}/>
                            <span>Full Time</span>
                        </label>

                        <label className={style.radioLabel}>
                            <input className={style.formControl} type="radio" name="job-type" id="part-time" value="part" onChange={timeHandle}/>
                            <span>Part Time</span>
                        </label>

                        <label className={style.radioLabel}>
                            <input className={style.formControl} type="radio" name="job-type" id="contract" value="contract" onChange={timeHandle}/>
                            <span>Contract</span>
                        </label>

                        <label className={style.radioLabel}>
                            <input className={style.formControl} type="radio" name="job-type" id="inter" value="intern" onChange={timeHandle}/>
                            <span>Internship</span>
                        </label>
                    </div>
                </div>
                
                <div className={style.formGroup}>
                    <label htmlFor="locate" className={style.formGroup}>Location :</label>
                    <select className={style.formControl} name="location" id="locate" onChange={locationHandle}>
                        <option value="" disabled selected>-- Choose location</option>
                        <option value="remote">Remote</option>
                        <option value="in-office">In-Office</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                    {office && officeLocation}
                    {hybrid && hybridLocation}
                </div>

                <div className={style.rowGrid}>
                    <div className={style.formGroup}>
                        <label htmlFor="min-sal" className={style.formGroup}>Minimal Salary :</label>
                        <input className={style.formControl} type="number" name="min-sal" id="min-sal" placeholder="$0..." value={jobData.salary.min}
                        onChange={(e) => setJobData({...jobData, salary: {...jobData.salary, min: e.target.value}})}/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="max-sal" className={style.formGroup}>Maximal Salary :</label>
                        <input className={style.formControl} type="number" name="max-sal" id="max-sal" placeholder="$1000000..." value={jobData.salary.max}
                        onChange={(e) => setJobData({...jobData, salary: {...jobData.salary, max: e.target.value}})}/>
                    </div>
                </div>

                <div className="button-form">
                    <button type="button" className={style.btnSubmit} onClick={() => {
                        for (const key in jobData) {
                            if (jobData[key] == "" || jobData.salary.min == "" || jobData.salary.max == "") {
                                window.alert("tolong isi form dengan benar");
                                return;
                            }

                        }
                        console.log(jobData)
                        const data = {
                            tag: jobData.tag,
                            tagClass: jobData.tagClass,
                            title: jobData.title,
                            desc: jobData.desc,
                            time: jobData.time,
                            location: hybrid ? `Hybrid(${jobData.location})` : jobData.location,
                            salary: `$${jobData.salary.min}-${jobData.salary.max}k`
                        }
                        dataHandle(data);
                        setIsSend(true)
                    }}>Add Job</button>
                </div>
            </div>
        </div>
    )
}

export default JobForm;