import {makeStyles} from "@mui/styles";
import TeacherNav from "../components/TeacherNav";
import {getTeacherData, getUserData} from "../components/UserData";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";


const useStyles = makeStyles(theme =>({
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
            color: "#fbb03b",
        },
    },
}));

const TeacherHome = () => {

    const classes = useStyles();
    let userData = getUserData();
    let teacherData = getTeacherData();

    console.log(userData);
    console.log(teacherData);

    if (JSON.parse(window.sessionStorage.getItem("userData")) === null) {
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
    } else {
        userData = JSON.parse(window.sessionStorage.getItem("userData"));
    }

    if (JSON.parse(window.sessionStorage.getItem("teacherData")) === null) {
        window.sessionStorage.setItem("teacherData", JSON.stringify(teacherData));
    } else {
        teacherData = JSON.parse(window.sessionStorage.getItem("teacherData"));
    }

    const errorMessage = (
        <div className={classes.errorContainer}>
            <Typography variant={"h6"} className={classes.errorMessage}>
                Sorry, but we cannot retrieve your information.
                <br/>
                <Link to="/teacher" className={classes.errorLink}>
                    Log in again.
                </Link>
            </Typography>
        </div>
    )

    console.log(userData);
    console.log(teacherData);

    const renderContent = () => {
        if (userData === null) return errorMessage;
        else {
            return (
                <Typography variant={"h6"}>
                    Hi, {userData.first_name}! You are teacher #{teacherData.id}
                </Typography>
            );
        }
    };
    const content = renderContent();

    return (
        <div className={classes.dashboard}>
            <TeacherNav active={1}/>
            { content }
        </div>
    )

};

export default TeacherHome;
