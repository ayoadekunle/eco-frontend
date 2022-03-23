import './AccessCard.css'

import {useState} from "react";
import {Paper} from "@mui/material";
import StudentSignUpForm from "./StudentSignUpForm";
import StudentSignInForm from "./StudentSignInForm";


const StudentAccessCard = () => {
    const SignIn = () => {
        return (
            <Paper className={"card"}>
                <h3>Sign in to your account</h3>
                <StudentSignInForm />
                <hr/>
                <p className={"student-message"}>
                    Don't have an account? <span className="link" onClick={() => changeForm("sign-up")}>Create Account.</span>
                </p>
            </Paper>
        )
    };

    const SignUp = () => {
        return (
            <Paper className={"card"}>
                <h3>Create Student Account</h3>
                <StudentSignUpForm/>
                <hr/>
                <p className={"student-message"}>
                    Already have an account? <span className="link" onClick={() => changeForm("sign-in")}>Log in.</span>
                </p>
            </Paper>
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
        <div className="card-container">
            { form }
        </div>
    )
};

export default StudentAccessCard;
