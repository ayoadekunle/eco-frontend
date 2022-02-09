import {useState} from "react";
import {Paper} from "@mui/material";
import SignUpForm from "./SignUpForm";

const LoginCard = () => {
    const SignIn = () => {
        return (
            <Paper>
                <h2>Sign in to your account</h2>
                <p>Don't have an account? <span className="link" onClick={() => changeForm("sign-up")}>Create Account.</span></p>
            </Paper>
        )
    }

    const SignUp = () => {
        return (
            <Paper>
                <h2>Create Teacher Account</h2>
                <SignUpForm />
                <p>
                    Already have an account? <span className="link" onClick={() => changeForm("sign-in")}>Log in.</span>
                </p>
            </Paper>
        )
    }

    const changeForm = ( to ) => {
        if (to === "sign-up") {
            setForm(SignUp())
        } else {
            setForm(SignIn())
        }
    }

    const [form, setForm] = useState( () => SignIn())

    return (
        <div className="card-container">
            <p>form</p>
        </div>
    )
}

export default LoginCard
