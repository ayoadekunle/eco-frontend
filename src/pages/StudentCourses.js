import {makeStyles} from "@mui/styles";
import StudentNav from "../components/StudentNav";
import {useNavigate} from "react-router-dom";
import {getUserData} from "../components/UserData";
import {useEffect, useState} from "react";
import axios from "axios";
import {Typography} from "@mui/material";


const useStyles = makeStyles(theme => ({
    courses: {},
}));

const StudentCourses = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    let userData = getUserData();

    if (JSON.parse(window.sessionStorage.getItem("userData")) === null) {
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
    } else {
        userData = JSON.parse(window.sessionStorage.getItem("userData"));
    }

    const [studentData, setStudentData] = useState({});

    useEffect( () => {
        if (userData === null) {
            navigate("/student");
        } else {
            axios.get('http://127.0.0.1:8000/students/' + userData.id)
                .then(r => {

                    setStudentData(r.data);

                })
                .catch(err => {
                    if (err.response) {
                        console.log(err.response.data);
                    }
                });
        }
    });

    return (
        <div className={classes.courses}>
            <StudentNav active={2}/>
            <Typography variant={"body1"}>
            </Typography>
        </div>
    )

};

export default StudentCourses;
