import logo from '../images/eco-regular.png'
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    body: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        textAlign: "center",
    },
    logo: {
        width: 250,
        height: "auto",
    },
    message: {
        margin: "30px 0 10px 0",
        fontSize: "18px",
    },
    links: {
        display: "flex",
        justifyContent: "center",
    },
    linkContent: {
        fontSize: "15px",
    },
    studentLink: {
        color: "#7dc241",
        textDecoration: "none",
        margin: "0 10px 0 10px",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    teacherLink: {
        color: "#fbb03b",
        textDecoration: "none",
        margin: "0 10px 0 10px",
        "&:hover": {
            textDecoration: "underline",
        },
    },
}));

const EmailConfirm = () => {

    const classes = useStyles()

    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <img className={classes.logo} src={logo} alt="eco logo regular"/>
                <p className={classes.message}>Your email has been confirmed!</p>
                <div className={classes.links}>
                    <Link to="/student" className={classes.studentLink}>
                        <p className={classes.linkContent}>Log in as Student</p>
                    </Link>
                    <Link to="/teacher" className={classes.teacherLink}>
                        <p className={classes.linkContent}>Log in as Teacher</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirm;
