import { useState } from "preact/hooks";
import JobForm from "../components/JobsForm.jsx";
import style from "../styling/Post.module.css"
import Succes from "../components/Succes.jsx";

function Post({ mainData, setData }) {
    const [isSend, setIsSend] = useState(false);
    const dataHandle = (data) => {
        if (mainData.length == 0) {
            data.id = "job-1";
            let newData = [];
            newData.push(data)
            setData(newData);
            localStorage.setItem("jobs", JSON.stringify(newData));
            return;
        }

        const getLastItem = mainData[mainData.length - 1].id;
        const getId = Number(getLastItem.replace("job-", ""));
        const newId = `job-${getId + 1}`;
        data.id = newId;
        setData([...mainData, data]);
        localStorage.setItem("jobs", JSON.stringify(getData));
    }

    return(
        <>
        {isSend ? <Succes post={isSend}/> : <><div className={style.container}>
            <div className={style.headerSection}>
                <h1 className={style.title}>Hire Top Tech Professionals</h1>
                <p className={style.subtitle}>Post your company's open position on TechJob and gain access to a highly qualified talent
                    pool. Ensure your job requirements are clear to attract the best-fitting applicants. Fill out the
                    comprehensive form below to publish your listing
                </p>
            </div>
            <div className="main">
                <JobForm setIsSend={setIsSend} dataHandle={dataHandle}/>
            </div>
        </div></>}
        
        </>
    )
}

export default Post;