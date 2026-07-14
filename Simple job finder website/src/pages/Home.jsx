import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/Card.jsx";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Home({ data }) {
    function hookData(jobs) {
        let hasil = [];
        for (let i = 0; i < 3; i++) {
            const index = Math.floor(Math.random() * jobs.length);
            hasil.push(jobs[index]);
        }

        return hasil;
    }
    return(
        <>
        <div className="cta-box">
            <h1 className="cta-text">Explore Opportunities & Talent</h1>
            <p className="cta-sub">Discover verified jobs or post your listing in minutes</p>
        </div>
        <div className="user-choice">
            <div className="card dev">
                <h3 className="choice-title">For Developers</h3>
                <p className="choice-text">Browse our Tech jobs and start your career today</p>
                <button type="button" className="choice jobs" onClick={() => window.location.href = "/jobs"}>Browse Jobs</button>
            </div>
            <div className="card emp">
                <h3 className="choice-title">For Employers</h3>
                <p className="choice-text">List your job to find perfect developer for the role</p>
                <button type="button" className="choice add" onClick={() => window.location.href = "/post"}>Post Job</button>
            </div>
        </div>
        <div className="hook-box">
            <h2 className="hook-title">Browse Jobs</h2>
            <div className="card-section">
                {(data.length != 0) && hookData(data).map((item) => {
                    return <Card id={item.id} tag={item.tag} title={item.title} text={item.text} tagClass={item.tagClass}
                        time={item.time} location={item.location} salary={item.salary} pages="" details=""/>
                })}
            </div>
            <div className="see-more">
                <p onClick={() => window.location.href = "/jobs"}>See More <FontAwesomeIcon icon={faChevronDown}/></p>
            </div>
        </div>
        </>
    )
}

export default Home;