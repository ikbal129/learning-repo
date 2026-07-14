import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    const currentYear = new Date().getFullYear();

    return(
        <footer>
            <div className="footer-content">
                <div className="left-foot">
                    <FontAwesomeIcon icon={faBriefcase}/><strong>TechJob</strong> -  Connecting top developer with next-gen companies.
                </div>
                <div className="right-foot">
                    <p>&copy; {currentYear} TechJob. Build with Passion.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;