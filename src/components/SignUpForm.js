import {useState} from "react";
import {Button, Grid, makeStyles, MenuItem, TextField} from "@mui/material";

const initialUserValues = {
    firstName: '',
    lastName: '',
    email: '',
    userType: 1,
    password: '',
}

const userTypes = [
    {
        value: 1,
        label: "Student",
    },
    {
        value: 2,
        label: "Teacher",
    }
];

const useStyles = makeStyles(theme => ({
    textField: {
        width: "80%",
        '& label.Mui-focused': {
            color: '#60992d',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: "#60992d",
        },
    },
    button: {
        color: "#f7f7f7",
        backgroundColor: "#60992d",
        cursor: "pointer",
        margin: "20px auto",
        width: "60%",
        borderRadius: "20px",
        "&:hover": {
            backgroundColor: "#46494c",
        }
    },
    formItem: {
        textAlign: "center",
    },
}));


const SignUpForm = () => {

    const [userValues, setUserValues] = useState(initialUserValues);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const classes = useStyles();

    const [userType, setUserType] = useState(1);
    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        handleChange(e, 'user_type');
    }

    const handleChange = (e, type) => {
        if (type === 'first_name') {
            setUserValues (prevState => {
                return { ...prevState, firstName: e.target.value}
            });
        } else if (type === 'last_name') {
            setUserValues (prevState => {
                return { ...prevState, lastName: e.target.value}
            });
        } else if (type === 'email') {
            setUserValues (prevState => {
                return { ...prevState, email: e.target.value}
            });
        } else if (type === 'user_type') {
            setUserValues (prevState => {
                return { ...prevState, userType: e.target.value}
            });
        } else if (type === 'password') {
            setUserValues ( prevState => {
                return { ...prevState, password: e.target.value}
            });
        } else if (type === 'confirm_password') {
            setPasswordConfirmation(e.target.value)
        }
    }

    const validateForm = () => {
        let validate = true
        // Validate names: Cannot be empty
        if (userValues.firstName === '') {
            setFirstNameTag(renderFirstName('invalid', "Required field"))
            validate = false
        } else {
            setFirstNameTag(renderFirstName('valid', ""))
        }

        if (userValues.lastName === '') {
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
            let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
            if (!(regex.test(userValues.email))) {
                setEmailTag(renderEmail('invalid', "Invalid format"))
                validate = false
            } else {
                setEmailTag(renderEmail('valid'))
            }
        }

        // Validate password: must be at least than 8 characters long.
        if (userValues.password.length < 8) {
            setPasswordTag(renderPassword('invalid'))
            validate = false
        } else {
            setPasswordTag(renderPassword('valid'))
        }

        if (passwordConfirmation !== userValues.password) {
            setConfirmTag(renderConfirm('invalid'))
            validate = false
        } else {
            setConfirmTag(renderConfirm('valid'))
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
                <TextField variant="standard"
                           label="Email Address"
                           size="small"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'email')}
                           required
                />
            )
        } else {
            return (
                <TextField variant="standard"
                           label="Email Address"
                           size="small"
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

    const renderFirstName = (type, errorMessage) => {
        if (type === 'valid') {
            return (
                <TextField variant="standard"
                               label="First Name"
                               size="small"
                               className={classes.textField}
                               onChange={e => handleChange(e, 'first_name')}
                               required
                    />
            )
        } else {
            return (
                <TextField variant="standard"
                           label="First Name"
                           size="small"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'first_name')}
                           required
                           error
                           helperText={errorMessage}
                />
            )
        }
    }
    const [firstNameTag, setFirstNameTag] = useState(() => renderFirstName('valid', ''))

    const renderLastName = (type, errorMessage) => {
        if (type === 'valid') {
            return (
                <TextField variant="standard"
                               label="Last Name"
                               size="small"
                               className={classes.textField}
                               onChange={e => handleChange(e, 'last_name')}
                               required
                    />
            )
        } else {
            return (
                <TextField variant="standard"
                           label="Last Name"
                           size="small"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'last_name')}
                           required
                           error
                           helperText={errorMessage}
                />
            )
        }
    }
    const [lastNameTag, setLastNameTag] = useState(() => renderLastName('valid', ''))

    const renderPassword = (type) => {
        if (type === 'valid') {
            return (
                <TextField variant="standard"
                           label="Create Password"
                           size="small"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'password')}
                           type="password"
                           required
                           helperText="Must be at least 8 characters long"
                />
            )
        } else {
            return (
                <TextField variant="standard"
                           label="Create Password"
                           size="small"
                           className={classes.textField}
                           onChange={e => handleChange(e, 'password')}
                           type="password"
                           required
                           helperText="Must be at least 8 characters long"
                           error
                />
            )
        }
    }
    const [passwordTag, setPasswordTag] = useState(() => renderPassword('valid'))

    const renderConfirm = (type) => {
        if (type === 'valid') {
            return (
                <TextField variant="standard"
                           label="Confirm Password"
                           size="small"
                           className={classes.textField}
                           type="password"
                           onChange={e => handleChange(e, 'confirm_password')}
                           required
                />
            )
        } else {
            return (
                <TextField variant="standard"
                           label="Create Password"
                           size="small"
                           className={classes.textField}
                           type="password"
                           onChange={e => handleChange(e, 'confirm_password')}
                           required
                           helperText="Passwords do not match"
                           error
                />
            )
        }
    }
    const [confirmTag, setConfirmTag] = useState(() => renderConfirm('valid'))

    return (
        <form className="sign-up-form">
            <Grid container spacing={2}>
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
                    <TextField variant="standard"
                           select
                           label="I am a ..."
                           size="small"
                           value={userType}
                           onChange={e => handleUserTypeChange(e)}
                           className={classes.textField}
                           required
                    >
                        {userTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
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
        </form>
    )
}


export default SignUpForm
