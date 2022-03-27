import {useState} from "react";
import {Alert, Button, Grid, TextField} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";


const initialUserValues = {
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
};

const useStyles = makeStyles(theme => ({
    form : {
        "&:focus": {
            outline: "none",
        },
    },
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
        cursor: "pointer",
        margin: "20px auto",
        width: "80%",
        height: "50px",
        borderRadius: "5px",
        fontFamily: "Heiti SC",
        "&.MuiButton-text": {
            color: "#f7f7f7",
            backgroundColor: "#fbb03b",
            "&:hover": {
                backgroundColor: "#da9933",
            },
        },
    },
    formItem: {
        textAlign: "center",
    },
    gridContainer: {
        marginBottom: "16px",
    },
}));


const TeacherSignUpForm = () => {

    const [userValues, setUserValues] = useState(initialUserValues);
    const classes = useStyles();

    const handleChange = (e, type) => {
        if (type === 'first_name') {
            setUserValues (prevState => {
                return { ...prevState, first_name: e.target.value}
            });
        } else if (type === 'last_name') {
            setUserValues (prevState => {
                return { ...prevState, last_name: e.target.value}
            });
        } else if (type === 'email') {
            setUserValues (prevState => {
                return { ...prevState, email: e.target.value}
            });
        } else if (type === 'password') {
            setUserValues ( prevState => {
                return { ...prevState, password1: e.target.value}
            });
        } else if (type === 'confirm_password') {
            setUserValues ( prevState => {
                return { ...prevState, password2: e.target.value}
            });
        }
    };

    const validateForm = () => {
        let validate = true
        // Validate names: Cannot be empty
        if (userValues.first_name === '') {
            setFirstNameTag(renderFirstName('invalid', "Required field"))
            validate = false
        } else {
            setFirstNameTag(renderFirstName('valid', ""))
        }

        if (userValues.last_name === '') {
            setLastNameTag(renderLastName('invalid', "Required field"))
            validate = false
        } else {
            setLastNameTag(renderLastName('valid', ""))
        }

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
        if (userValues.password1.length < 8) {
            setPasswordTag(renderPassword('invalid'))
            validate = false
        } else {
            setPasswordTag(renderPassword('valid'))
        }

        if (userValues.password1 !== userValues.password2) {
            setConfirmTag(renderConfirm('invalid'))
            validate = false
        } else {
            setConfirmTag(renderConfirm('valid'))
        }

        return validate;
    };

    const handleSubmit = () => {

        if(validateForm()) {

            axios.post('http://127.0.0.1:8000/auth/register/', userValues)
                .then(r => {

                    let alerts = [];

                    Object.values(r.data).forEach ( item => {
                        alerts.push(
                            <Grid item xs={12}>
                                <Alert severity="success"> { item } </Alert>
                            </Grid>
                        );
                    });

                    setAlertsTag(renderAlert(alerts));

                })
                .catch(err => {
                    if (err.response) {
                        // The request was made and the server responded with a status code
                        let alerts = [];

                        Object.values(err.response.data).forEach ( item => {
                            alerts.push(
                                <Grid item xs={12}>
                                    <Alert severity="error"> { item } </Alert>
                                </Grid>
                            );
                        });

                        setAlertsTag(renderAlert(alerts));

                        // console.log(err.response.data);
                        // console.log(err.response.status);
                        // console.log(err.response.headers);
                    } else if (err.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(err.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', err.message);
                    }
                })
        }
    };

    const handleEnterDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    };

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
    };
    const [emailTag, setEmailTag] = useState(() => renderEmail('valid', ''));

    const renderFirstName = (type, errorMessage) => {
        if (type === 'valid') {
            return (
                <TextField variant="outlined"
                               label="First Name"
                               className={classes.textField}
                               onChange={e => handleChange(e, 'first_name')}
                               required
                    />
            )
        } else {
            return (
                <TextField variant="outlined"
                           label="First Name"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'first_name')}
                           required
                           error
                           helperText={errorMessage}
                />
            )
        }
    };
    const [firstNameTag, setFirstNameTag] = useState(() => renderFirstName('valid', ''));

    const renderLastName = (type, errorMessage) => {
        if (type === 'valid') {
            return (
                <TextField variant="outlined"
                               label="Last Name"
                               className={classes.textField}
                               onChange={e => handleChange(e, 'last_name')}
                               required
                    />
            )
        } else {
            return (
                <TextField variant="outlined"
                           label="Last Name"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'last_name')}
                           required
                           error
                           helperText={errorMessage}
                />
            )
        }
    };
    const [lastNameTag, setLastNameTag] = useState(() => renderLastName('valid', ''));

    const renderPassword = (type) => {
        if (type === 'valid') {
            return (
                <TextField variant="outlined"
                           label="Create Password"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'password')}
                           type="password"
                           required
                           helperText="Must be at least 8 characters long"
                />
            )
        } else {
            return (
                <TextField variant="outlined"
                           label="Create Password"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'password')}
                           type="password"
                           required
                           helperText="Must be at least 8 characters long"
                           error
                />
            )
        }
    };
    const [passwordTag, setPasswordTag] = useState(() => renderPassword('valid'));

    const renderConfirm = (type) => {
        if (type === 'valid') {
            return (
                <TextField variant="outlined"
                           label="Confirm Password"
                           className={classes.textField}
                           type="password"
                           onChange={e => handleChange(e, 'confirm_password')}
                           required
                />
            )
        } else {
            return (
                <TextField variant="outlined"
                           label="Create Password"
                           className={classes.textField}
                           type="password"
                           onChange={e => handleChange(e, 'confirm_password')}
                           required
                           helperText="Passwords do not match"
                           error
                />
            )
        }
    };
    const [confirmTag, setConfirmTag] = useState(() => renderConfirm('valid'));

    const renderAlert = ( messages ) => {
        if (messages === null) {
            return (
                <div hidden={true}/>
            )
        } else {
            return (
                <Grid container spacing={2} className={classes.gridContainer}>
                    { messages }
                </Grid>
            )
        }
    };
    const [alertsTag, setAlertsTag] = useState(renderAlert(null));

    return (
        <form className={classes.form} onKeyDown={handleEnterDown} tabIndex="0">
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={6} className={classes.formItem}>
                    { firstNameTag }
                </Grid>
                <Grid item xs={6} className={classes.formItem}>
                    { lastNameTag }
                </Grid>
                <Grid item xs={12} className={classes.formItem}>
                    { emailTag }
                </Grid>
                <Grid item xs={12} className={classes.formItem}>
                    { passwordTag }
                </Grid>
                <Grid item xs={12} className={classes.formItem}>
                    { confirmTag }
                </Grid>
                <Grid item xs={12} className={classes.formItem}>
                    <Button className={classes.button} onClick = {handleSubmit}>
                        Create Account
                    </Button>
                </Grid>
            </Grid>
            { alertsTag }
        </form>
    )
}

export default TeacherSignUpForm;
