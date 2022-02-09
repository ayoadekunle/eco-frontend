import logo from '../images/teacher-regular.png'
import './TeacherLogin.css'
import TeacherAccessCard from "../components/TeacherAccessCard";


const TeacherLogin = () => {
    return (
        <div className={"page-container"}>
            <div className="page">
                <div className={'logo-container'}>
                  <img src={logo} alt="logo" className={"logo"}/>
                </div>
                <TeacherAccessCard />
            </div>
        </div>
    );
}

export default TeacherLogin;
