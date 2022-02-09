import {Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {makeStyles} from "@mui/styles";


const initialUserValues = {
    email: '',
    password: '',
}

const useStyles = makeStyles(theme => ({
    textField: {
        width: "100%",
        '& label.Mui-focused': {
            color: "#fbb03b",
        },
        '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: "#fbb03b",
              },
            },
        fontFamily: "Heiti SC",
    },
    button: {
        color: "#f7f7f7",
        backgroundColor: "#fbb03b",
        cursor: "pointer",
        margin: "20px auto",
        width: "80%",
        height: "50px",
        borderRadius: "5px",
        fontFamily: "Heiti SC",
        "&:hover": {
            backgroundColor: "#da9933",
        }
    },
    formItem: {
        textAlign: "center",
    },
}));


const TeacherSignInForm = () => {

    const classes = useStyles();

    const [userValues, setUserValues] = useState(initialUserValues);

    const handleChange = (e, type) => {
        if (type === 'email') {
            setUserValues (prevState => {
                return { ...prevState, email: e.target.value}
            });
        } else if (type === 'password') {
            setUserValues ( prevState => {
                return { ...prevState, password: e.target.value}
            });
        }
    }

    const validateForm = () => {
        let validate = true

        // Validate email: email regex, cannot be empty
        if (userValues.email === '') {
            setEmailTag(renderEmail('invalid', "Required field"))
            validate = false
        } else {
            let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
            if (!(regex.test(userValues.email))) {
                setEmailTag(renderEmail('invalid', "Invalid format"))
                validate = false
            } else {
                setEmailTag(renderEmail('valid'))
            }
        }

        // Validate password: must be at least 8 characters long.
        if (userValues.password.length < 8) {
            setPasswordTag(renderPassword('invalid'))
            validate = false
        } else {
            setPasswordTag(renderPassword('valid'))
        }

        return validate
    }


    const handleSubmit = () => {
        if(validateForm()) {
            console.log("validate form");
            console.log(userValues)
        } else {
            console.log("! validate form");

        }
    }


    const renderEmail = (type, errorMessage) => {
        if (type === 'valid') {
            return (
                <TextField variant="outlined"
                           label="Email Address"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'email')}
                           required
                />
            )
        } else {
            return (
                <TextField variant="outlined"
                           label="Email Address"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'email')}
                           required
                           error
                           helperText={errorMessage}
                />
            )
        }
    }
    const [emailTag, setEmailTag] = useState(() => renderEmail('valid', ''))

    const renderPassword = (type) => {
        if (type === 'valid') {
            return (
                <TextField variant="outlined"
                           label="Password"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'password')}
                           type="password"
                           required
                />
            )
        } else {
            return (
                <TextField variant="outlined"
                           label="Password"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'password')}
                           type="password"
                           required
                           helperText="Required Field"
                           error
                />
            )
        }
    }
    const [passwordTag, setPasswordTag] = useState(() => renderPassword('valid'))

    return (
        <form className="sign-up-form">
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.formItem}>
                    { emailTag }
                </Grid>
                <Grid item xs={12} className={classes.formItem}>
                    { passwordTag }
                </Grid>
                <Grid item xs={12} className={classes.formItem}>
                    <Button className={classes.button} onClick = {handleSubmit}>
                        Log In
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default TeacherSignInForm
