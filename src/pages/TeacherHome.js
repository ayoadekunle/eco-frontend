import {makeStyles} from "@mui/styles";
import TeacherNav from "../components/TeacherNav";
import {getTeacherData, getUserData} from "../components/UserData";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import TeacherHomeBanner from "../components/TeacherHomeBanner";
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
            color: "#fbb03b",
        },
    },
}));

const TeacherHome = () => {

    const classes = useStyles();
    let userData = getUserData();
    let teacherData = getTeacherData();

    if (userData === null) {
        userData = JSON.parse(window.sessionStorage.getItem("userData"));
    } else {
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
    }

    if (teacherData === null) {
        teacherData = JSON.parse(window.sessionStorage.getItem("teacherData"));
    } else {
        window.sessionStorage.setItem("teacherData", JSON.stringify(teacherData));
    }

    const renderContent = () => {
        if (userData === null || teacherData === null) return (
            <div className={classes.content}>
                <div className={classes.errorContainer}>
                    <Typography variant={"h6"} className={classes.errorMessage}>
                        Sorry, but we cannot retrieve your information.
                        <br/>
                        <Link to="/teacher" className={classes.errorLink}>
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
                        Hi, {userData.first_name}! You are teacher #{teacherData.id}
                    </Typography>
                </div>
            );
        }
    };
    const content = renderContent();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users/' + userData.id)
            .then(r => {
                userData = r.data;
                window.sessionStorage.setItem("userData", JSON.stringify(userData));
            }).catch(err => {
            console.log(err);
        })

        axios.get('http://127.0.0.1:8000/teachers/' + userData.id)
            .then(r => {
                teacherData = r.data;

                window.sessionStorage.setItem("teacherData", JSON.stringify(teacherData));

            }).catch(err => {
            console.log(err);
        })
    }, [userData, teacherData]);

    return (
        <div className={classes.dashboard}>
            <TeacherNav active={1}/>
            <TeacherHomeBanner firstName={userData.first_name}/>
            {content}
        </div>
    )

};

export default TeacherHome;
