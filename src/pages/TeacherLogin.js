import logo from '../images/teacher-regular.png'
import './TeacherLogin.css'
import LoginCard from "../components/LoginCard";


const TeacherLogin = () => {
    return (
      <div className="page">
          <img src={logo} alt="logo" className={"logo"}/>
          <LoginCard />
      </div>
    );
}

export default TeacherLogin;
