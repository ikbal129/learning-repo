import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Navbar() {
    return(
        <div className="navbar">
            <h1>🖍Keepp</h1>
            <span className="git-box" onClick={() => {
                window.open("https://github.com/ikbal129", "_blank", "noopener,noreferrer");
            }}>
                <span className="git-icon"><FontAwesomeIcon icon={faGithub}/></span>
                <p>Github</p>
            </span>
        </div>
    )
}

export default Navbar