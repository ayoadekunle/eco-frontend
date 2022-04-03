import {useState} from "react";
import {Card, Typography} from "@mui/material";
import StudentSignUpForm from "./StudentSignUpForm";
import StudentSignInForm from "./StudentSignInForm";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(theme => ({
    cardContainer: {
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        padding: "20px",
        textAlign: "center",
        width: "70%",
        maxWidth: "500px",
        backgroundColor: "white",
        borderRadius: "10px",
    },
    studentMessage: {
        fontSize: "14px",
    },
    link: {
        color: "#7dc241",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
            transitionDuration: "0.2s",
            transitionProperty: "color",
            transitionDelay: "0s",
        },
    },
    hr: {
        backgroundColor: "#dddfe2",
        border: "none",
        height: "1px",
        margin: "20px 0",
    },
}));

const StudentAccessCard = () => {

    const classes = useStyles();

    const SignIn = () => {
        return (
            <Card className={classes.card}>
                <Typography variant={"h5"}>
                    Sign in to your account
                </Typography>
                <StudentSignInForm />
                <hr className={classes.hr}/>
                <Typography variant={"body2"} className={classes.studentMessage}>
                    Don't have an account? <span className={classes.link} onClick={() => changeForm("sign-up")}>Create Account.</span>
                </Typography>
            </Card>
        )
    };

    const SignUp = () => {
        return (
            <Card className={classes.card}>
                <Typography variant={"h5"}>
                    Create account
            </Typography>
                <StudentSignUpForm/>
                <hr className={classes.hr}/>
                <Typography variant={"body2"} className={classes.studentMessage}>
                    Already have an account? <span className={classes.link} onClick={() => changeForm("sign-in")}>Log in.</span>
                </Typography>
            </Card>
        )
    };

    const changeForm = ( to ) => {
        if (to === "sign-up") {
            setForm(SignUp())
        } else {
            setForm(SignIn())
        }
    };

    const [form, setForm] = useState( () => SignIn())

    return (
        <div className={classes.cardContainer}>
            { form }
        </div>
    )
};

export default StudentAccessCard;
