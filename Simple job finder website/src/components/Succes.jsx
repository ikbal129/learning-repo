import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styling/Succes.module.css"

function Succes({ post, apply }) {
    const applyText = ["Application Submitted Succesfully",`Thank you for applying! Your professional profile and resume have been securely received.
                    The recruitment team will review your qualifications, and you will receive an update via email if
                    your profile matches their reqruitments`];
    const postText = ["Job Listing Published Successfully! 🎉", `Your job post is now live on TechJob. Talented tech professionals can view, search, and apply for this position starting right now. You can monitor applications and manage this listing directly from your dashboard.`]
    return(
        <>
        <div className={styles.wrapper}>
            <div className="header">
                <div className={styles.check}>
                    <FontAwesomeIcon icon={faCircleCheck}/>
                </div>
                <h1 className={`${styles.header} ${styles.title}`}>{post && postText[0]} {apply && applyText[0]}</h1>
                <p className={`${styles.header} ${styles.desc}`}> {post && postText[1]} {apply && applyText[1]}
                </p>
            </div>
            <hr className={styles.horizon}/>
            <div className={styles.btnBox}>
                <button type="button" className={styles.btn} onClick={() => window.location.href = "/"}>Back to Home</button>
            </div>
        </div>
        </>
    )
}

export default Succes;