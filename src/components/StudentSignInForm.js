import {Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {makeStyles} from "@mui/styles";
import axios from "axios";


const initialUserValues = {
    email: '',
    password: '',
}

const useStyles = makeStyles(theme => ({
    form: {
        "&:focus": {
            outline: "none",
        },
    },
    textField: {
        width: "100%",
        '& label.Mui-focused': {
            color: "#7dc241",
        },
        '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: "#7dc241",
              },
            },
    },
    button: {
        color: "#f7f7f7",
        backgroundColor: "#7dc241",
        cursor: "pointer",
        margin: "20px auto",
        width: "80%",
        height: "50px",
        borderRadius: "5px",
        fontFamily: "Heiti SC",
        "&:hover": {
            backgroundColor: "#679f35",
        }
    },
    formItem: {
        textAlign: "center",
    },
}));


const StudentSignInForm = () => {

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
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (!(regex.test(userValues.email))) {
                setEmailTag(renderEmail('invalid', "Invalid format"))
                validate = false
            } else {
                setEmailTag(renderEmail('valid'))
            }
        }

        // Validate password: must be at least 8 characters long.
        if (userValues.password.length <= 0) {
            setPasswordTag(renderPassword('invalid'))
            validate = false
        } else {
            setPasswordTag(renderPassword('valid'))
        }

        return validate
    }

    const handleSubmit = () => {
        if(validateForm()) {
            axios.post('http://127.0.0.1:8000/auth/login/', userValues)
                .then(r => {
                    console.log(r)
                })
                .catch(e => {
                    if (e.response) {
                        // The request was made and the server responded with a status code
                        console.log(e.response.data);
                        console.log(e.response.status);
                        console.log(e.response.headers);
                    } else if (e.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(e.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', e.message);
                    }
                })
        }
    }

    const handleEnterDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
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
        <form className={classes.form} onKeyDown={handleEnterDown} tabIndex="0">
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

export default StudentSignInForm
