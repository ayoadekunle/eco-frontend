import {makeStyles} from "@mui/styles";
import StudentNav from "../components/StudentNav";
import {getStudentData, getUserData} from "../components/UserData";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";


const useStyles = makeStyles(theme => ({
    dashboard: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    errorContainer: {
        height: "",
        display: "flex",
        textAlign: "center",
    },
    errorMessage: {
        fontWeight: 500,
    },
    errorLink: {
        color: "black",
        "&:hover": {
            color: "#7dc241",
        },
    },
}));

const StudentHome = () => {

    const classes = useStyles();
    let userData = getUserData();
    let studentData = getStudentData();

    console.log(userData);
    console.log(studentData);

    if (JSON.parse(window.sessionStorage.getItem("userData")) === null) {
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
    } else {
        userData = JSON.parse(window.sessionStorage.getItem("userData"));
    }

    if (JSON.parse(window.sessionStorage.getItem("studentData")) === null) {
        window.sessionStorage.setItem("studentData", JSON.stringify(studentData));
    } else {
        studentData = JSON.parse(window.sessionStorage.getItem("studentData"));
    }

    const errorMessage = (
        <div className={classes.errorContainer}>
            <Typography variant={"h6"} className={classes.errorMessage}>
                Sorry, but we cannot retrieve your information.
                <br/>
                <Link to="/student" className={classes.errorLink}>
                    Log in again.
                </Link>
            </Typography>
        </div>
    )

    console.log(userData);
    console.log(studentData);

    const renderContent = () => {
        if (userData === null) return errorMessage;
        else {
            return (
                <Typography variant={"h6"}>
                    Hi, {userData.first_name}! You are student #{studentData.id}
                </Typography>
            );
        }
    };
    const content = renderContent();

    return (
        <div className={classes.dashboard}>
            <StudentNav active={1}/>
            { content }
        </div>
    )

};

export default StudentHome;
