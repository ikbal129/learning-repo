import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faLocationDot, faMoneyBill } from "@fortawesome/free-solid-svg-icons"

function Card({ id, tag, title, text, tagClass, time, location, salary, pages, details, disable }) {
    return(
        <>
        <div className="job-card">
            <span className={`tag ${tagClass}`}>{tag}</span>
            <div className="card-text">
                <h2 className="title">{title}</h2>
                <p>{text}</p>
            </div>
            <div className={`details ${pages}`}>
                <div className={`details-text ${details}`}>
                    <span className="dets time">
                        <FontAwesomeIcon icon={faClock}/>
                        <p className="contents">{time}</p>
                    </span>
                    <span className="dets location">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <p className="contents">{location}</p>
                    </span>
                    <span className="dets salary">
                        <FontAwesomeIcon icon={faMoneyBill}/>
                        <p className="contents">{salary}</p>
                    </span>
                </div>
                <div className="details-view">
                    <a href={`/jobs/apply/${id}`} className={disable}>View Job ➡</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default Card