import logoHorizontal from '../images/eco-logo.png';
import './HomeNavBar.css';
import { Link } from "react-router-dom";

const HomeNavBar = () => {

    return (
        <div className="nav-container">
             <img src={logoHorizontal} alt="logo-horizontal" className="logo-horizontal"/>
             <div className="buttons">
                 <Link to="/student">
                     <button className="student-button">STUDENT</button>
                 </Link>
                 <Link to="/teacher">
                     <button className="teacher-button">TEACHER</button>
                 </Link>
             </div>
        </div>
    )
}

export default HomeNavBar;
