import { useRoute } from "preact-iso"
import Card from "../components/Card.jsx";
import { useState } from "preact/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Succes from "../components/Succes.jsx";

function JobApply({ data }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cv: "",
        portofolio: "",
        coverLetter: "",
        expectedSalay: ""
    });
    const [isSubmit, setIsSubmit] = useState(false);

    const { params } = useRoute();
    const jobId = params.id;
    const cardData = data.find(job => job.id == jobId);

    return(
    <div className="apply-wrap">
        <Card id={cardData.id} tag={cardData.tag} title={cardData.title} text={cardData.text} tagClass={cardData.tagClass}
            time={cardData.time} location={cardData.location} salary={cardData.salary} pages="jobs-pages-ui"
            details="jobs-detail-ui" disable={"disabled-links"}/>

        {isSubmit ? <Succes /> : (<>
        <h3 className="form-title">Application Form</h3>
        <p className="form-subtitle">Please fill out the form below to submit your application.</p>
        <div className="form-wrap">
            <div className="form-section required-form">
                <h4 className="title-section req-title">Personal Information</h4>
                <div className="form-grid">
                    <div className="form">
                        <label htmlFor="name">Full name<span>*</span> :</label>
                        <input type="text" name="name" id="name" placeholder="Full name..." required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
                    </div>
                    <div className="form">
                        <label htmlFor="email">Email<span>*</span> :</label>
                        <input type="email" name="email" id="email" placeholder="example@email.com..." required value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                    </div>
                    <div className="form">
                        <label htmlFor="phone">Phone Number<span>*</span> :</label>
                        <input type="tel" name="phone" id="phone" placeholder="Phone number..." required value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}/>
                    </div>
                    <div className="form">
                        <label htmlFor="cv-up">Upload CV<span>*</span> :</label>
                        <div className="custom-file">
                            <input type="file" name="cv-up" id="cv-up" required accept=".pdf" 
                        onChange={(e) => setCv(e.target.files[0].name)}/>
                            <label htmlFor="cv-up" className="file-drop-zone">
                                <span className="upload-icon"><FontAwesomeIcon icon={faFile}/></span>
                                <span className="upload-text">Click to upload</span>
                                <span className="upload-hint">PDF format only {"(Max 5MB)"}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="form-divider"/>

            <div className="form-section optional-form">
                <h4 className="title-section additional">Additional Information <span>{"(Optional)"}</span></h4>
                <div className="form-grid">
                    <div className="form">
                        <label htmlFor="porto">Cover Letter :</label>
                        <input type="url" name="porto" id="porto" placeholder="https://example.com..." value={formData.portofolio}
                        onChange={(e) => setFormData({...formData, portofolio: e.target.value})}/>
                    </div>
                    <div className="form">
                        <label htmlFor="expSal">Expected Salary :</label>
                        <input type="number" name="expSal" id="expSal" placeholder="e.g. 150000$" value={formData.expectedSalay}
                        onChange={(e) => setFormData({...formData, expectedSalay: e.target.value})}/>
                    </div>
                    <div className="form">
                        <label htmlFor="cover">Cover Letter :</label>
                        <textarea name="cover" id="cover" rows={4} placeholder="Tell the company why you area great fit..."
                        value={formData.coverLetter} onChange={(e) => setFormData({... formData, coverLetter: e.target.value})}></textarea>
                    </div>

                    <div className="button-section">
                        <span>

                            <button type="button" className="apply-btn" onClick={() => {
                                setIsSubmit(true);
                            }}>Apply</button>
                        </span>
                    </div>
                </div>
            </div>
        </div></>)}

    </div>)
}

export default JobApply