import {makeStyles} from "@mui/styles";
import StudentNav from "../components/StudentNav";
import {getStudentData, getUserData} from "../components/UserData";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import StudentHomeBanner from "../components/StudentHomeBanner";
import {useEffect} from "react";
import axios from "axios";


const useStyles = makeStyles(theme => ({
    dashboard: {
        height: "100%",
    },
    content: {
        display: "flex",
        justifyContent: "center",
    },
    errorContainer: {
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

    if (userData === null) {
        userData = JSON.parse(window.sessionStorage.getItem("userData"));
    } else {
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
    }

    if (studentData === null) {
        studentData = JSON.parse(window.sessionStorage.getItem("studentData"));
    } else {
        window.sessionStorage.setItem("studentData", JSON.stringify(studentData));
    }

    const renderContent = () => {
        if (userData === null || studentData === null) return (
            <div className={classes.content}>
                <div className={classes.errorContainer}>
                    <Typography variant={"h6"} className={classes.errorMessage}>
                        Sorry, but we cannot retrieve your information.
                        <br/>
                        <Link to="/student" className={classes.errorLink}>
                            Log in again.
                        </Link>
                    </Typography>
                </div>
            </div>
        );
        else {
            return (
                <div className={classes.content}>
                    <Typography variant={"h6"}>
                        Hi, {userData.first_name}! You are student #{studentData.id}
                    </Typography>
                </div>
            );
        }
    };
    const content = renderContent();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users/' + userData.id + '/')
            .then(r => {
                userData = r.data;
                window.sessionStorage.setItem("userData", JSON.stringify(userData));
            }).catch(err => {
            console.log(err);
        })

        axios.get('http://127.0.0.1:8000/students/' + userData.id + '/')
            .then(r => {
                studentData = r.data;

                window.sessionStorage.setItem("studentData", JSON.stringify(studentData));

            }).catch(err => {
            console.log(err);
        })
    }, [userData, studentData]);

    return (
        <div className={classes.dashboard}>
            <StudentNav active={1}/>
            <StudentHomeBanner firstName={userData.first_name}/>
            {content}
        </div>
    )

};

export default StudentHome;
