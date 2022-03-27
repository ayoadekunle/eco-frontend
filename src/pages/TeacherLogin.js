import logo from '../images/teacher-regular.png'
import TeacherAccessCard from "../components/TeacherAccessCard";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(theme => ({
    pageContainer: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },
    page: {
        width: "100%",
        display: "inline-flex",
    },
    logoContainer: {
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: "200px",
        height: "auto",
    },
}));

const TeacherLogin = () => {

    const classes = useStyles();

    return (
        <div className={classes.pageContainer}>
            <div className={classes.page}>
                <div className={classes.logoContainer}>
                  <img src={logo} alt="logo" className={classes.logo}/>
                </div>
                <TeacherAccessCard />
            </div>
        </div>
    );
}

export default TeacherLogin;
