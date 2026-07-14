import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    return(
        <nav>
            <span className='logo-box'>
                <FontAwesomeIcon icon={faBriefcase}/>
                <h3>TechJob</h3>
            </span>
            <ul className='nav-links'>
                <li className="links"><a href="/">Home</a></li>
                <li className="links"><a href="/jobs">Jobs</a></li>
                <li className="links"><a href="/post">Post Job</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;