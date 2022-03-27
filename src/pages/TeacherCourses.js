import {makeStyles} from "@mui/styles";
import TeacherNav from "../components/TeacherNav";
import {useNavigate} from "react-router-dom";
import {getUserData} from "../components/UserData";
import {useEffect} from "react";
import axios from "axios";


const useStyles = makeStyles(theme =>({
    courses: {

    },
}));

const TeacherCourses = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const userData = getUserData();

    useEffect(() => {
        if (userData === null) {
            navigate("/teacher");
        } else {
            axios.get('http://127.0.0.1:8000/teachers/' + userData.id)
                .then(r => {

                    const teacherData = r.data;

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
            <TeacherNav active={2}/>
        </div>
    )

};

export default TeacherCourses;
