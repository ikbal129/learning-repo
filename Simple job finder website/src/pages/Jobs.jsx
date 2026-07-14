import { useState } from "preact/hooks";
import Card from "../components/Card.jsx"

function Jobs({ data }) {
    const [jobList, setJobList] = useState(data);
    function jobsData(category) {
        if (category == "latest") {
            const jData = sortByID([...jobList]);
            setJobList(jData);
        } else if (category == "salary") {
            const jData = sortBySalary([...jobList]);
            setJobList(jData)
        } else {
            setJobList(data);
        }
        return;
    }

    function sortByID(item) {
        const result = item.sort((a, b) => {
            const numA = Number(a.id.replace("job-", ""));
            const numB = Number(b.id.replace("job-", ""));
            return numB - numA
        });
        return result;
    }

    function sortBySalary(item) {
        const result = item.sort((a, b) => {
            const getMinSalary = (salaryStr) => {
                const match = salaryStr.match(/\d+/);
                return match ? Number(match[0]) : 0;
            }

            const salaryA = getMinSalary(a.salary);
            const salaryB = getMinSalary(b.salary);

            return salaryB - salaryA;
        })
        return result;
    }
    
    return(
        <div className="jobs-page">
            <div className="jobs-header">
                <h1>Find Your Dream Tech Job</h1>
                <p>Explore open position from startup and global tech. become a great developer</p>
            </div>
            <div className="sort-jobs">
                <label htmlFor="">Sort by:</label>
                <select id="sort" onChange={(e) => {
                    jobsData(e.target.value)
                    console.log(jobList)
                }}>
                    <option value="default">Default</option>
                    <option value="latest">Latest Posted</option>
                    <option value="salary">Highest Salary</option>
                </select>
            </div>
            <div className="jobs-card-box">
                {jobList.map((item) => {
                    // console.log(item)
                    return <Card id={item.id} tag={item.tag} title={item.title} text={item.text} tagClass={item.tagClass}
                            time={item.time} location={item.location} salary={item.salary} pages="jobs-pages-ui"
                            details="jobs-detail-ui"/>
                })}
            </div>
        </div>
    )
}

export default Jobs
