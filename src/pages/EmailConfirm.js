import logo from '../images/eco-vertical.png'
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";

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
        margin: "40px",
    },
    message: {
        margin: "30px 0 10px 0",
        fontSize: "18px",
    },
    links: {
        width: "400px",
        display: "flex",
        justifyContent: "space-evenly",
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

    const classes = useStyles();

    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <img className={classes.logo} src={logo} alt="eco logo regular"/>
                <Typography variant={"body1"} className={classes.message}>Your email has been confirmed!</Typography>
                <div className={classes.links}>
                    <Typography
                        variant={"body1"}
                        component={Link}
                        to={"/student"}
                        className={classes.studentLink}
                    >
                        Log in as Student
                    </Typography>
                    <Typography
                        variant={"body1"}
                        component={Link}
                        to={"/teacher"}
                        className={classes.teacherLink}
                    >
                        Log in as Teacher
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirm;
