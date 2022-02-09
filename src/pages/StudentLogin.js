import logo from "../images/eco-regular.png";
import StudentAccessCard from "../components/StudentAccessCard";

const StudentLogin = () => {
    return (
      <div className={"page-container"}>
            <div className="page">
                <div className={'logo-container'}>
                  <img src={logo} alt="logo" className={"logo"}/>
                </div>
                <StudentAccessCard />
            </div>
        </div>
    );
}

export default StudentLogin;
