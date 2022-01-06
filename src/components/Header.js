import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faMoon, faMusic, faSun } from "@fortawesome/free-solid-svg-icons";

const Header = ({ setLibraryStatus, libraryStatus, isDarkModeActive, setIsDarkModeActive }) => {
    return(
        <nav className="header">
            <div>
                <h1 className={`${isDarkModeActive? "dark-header-icon-text": ""}`}>Cozy Vibes <FontAwesomeIcon icon={faCoffee}/></h1>
            </div>
            <div className="nav-btn-container">
                <button
                    className={`${isDarkModeActive? "dark-btn" : ""}`}
                    onClick={()=> setLibraryStatus(!libraryStatus)}
                >
                Library
                <FontAwesomeIcon icon= {faMusic}/>
                </button>
                <button
                    className={`${isDarkModeActive? "dark-btn" : ""}`}
                    onClick={()=> setIsDarkModeActive(!isDarkModeActive)}
                >
                {`${isDarkModeActive? "Day Mode": "Dark Mode"}`}
                <FontAwesomeIcon icon={isDarkModeActive? faMoon: faSun}/>
                </button>
            </div>
        </nav>
    )
}

export default Header