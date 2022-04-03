import {makeStyles} from "@mui/styles";
import TeacherNav from "../components/TeacherNav";
import {Link} from "react-router-dom";
import {getTeacherData, getUserData} from "../components/UserData";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab, Grid, IconButton, InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import TeacherCoursesBanner from "../components/TeacherCoursesBanner";
import {useEffect, useState} from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdapterMoment from '@mui/lab/AdapterMoment';
import {DatePicker, LocalizationProvider} from "@mui/lab";
import axios from "axios";
import moment from "moment";


const useStyles = makeStyles(theme => ({
    courses: {
        height: "100%",
    },
    content: {
        display: "flex",
        justifyContent: "center",
    },
    errorContainer: {
        display: "flex",
        textAlign: "center",
    },
    errorMessage: {
        fontWeight: 500,
    },
    errorLink: {
        color: "black",
        "&:hover": {
            color: "#fbb03b",
        },
    },
    fab: {
        "&.MuiFab-root": {
            position: "fixed",
            right: "30px",
            bottom: "30px",
            color: "#f7f7f7",
            backgroundColor: "#fbb03b",
            "&:hover": {
                backgroundColor: "#da9933",
            }
        },
    },
    dialog: {
        textAlign: "center",
    },
    dialogTitle: {
        "&.MuiTypography-root": {
            margin: 0,
        },
    },
    dialogContent: {
        width: "400px",
        "&.MuiDialogContent-root": {
            padding: "15px",
        },
    },
    dialogSubmit: {
        width: "120px",
        height: "40px",
        "&.MuiButton-text": {
            color: "#fbb03b"
        },
        "&.MuiButton-root": {
            "&:hover": {
                backgroundColor: "#fff9ef",
            },
        },
    },
    dialogActions: {
        "&.MuiDialogActions-root": {
            padding: "0 15px 15px 15px",
        },
    },
    textField: {
        width: "100%",
        '&.MuiTextField-root': {
            margin: "8px 0",
        },
        '& label.Mui-focused': {
            color: "#fbb03b",
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: "#fbb03b",
            },
        },
    },
    gridContainer: {
        marginBottom: "16px",
    },
}));

const TeacherCourses = () => {

    const classes = useStyles();
    let userData = getUserData();
    let teacherData = getTeacherData();

    if (userData === null) {
        userData = JSON.parse(window.sessionStorage.getItem("userData"));
    } else {
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
    }

    if (teacherData === null) {
        teacherData = JSON.parse(window.sessionStorage.getItem("teacherData"));
    } else {
        window.sessionStorage.setItem("teacherData", JSON.stringify(teacherData));
    }

    let courses = teacherData.courses;

    const [activePage, setActivePage] = useState(1);

    const renderCoursePage = () => {
        // filter courses for cards
        if (activePage === 1) {
            return (
                <Typography variant={"h4"}>
                    All
                </Typography>
            );
        } else if (activePage === 2) {
            return (
                <Typography variant={"h4"}>
                    Starred
                </Typography>
            );
        } else if (activePage === 3) {
            return (
                <Typography variant={"h4"}>
                    Active
                </Typography>
            );
        } else if (activePage === 4) {
            return (
                <Typography variant={"h4"}>
                    Concluded
                </Typography>
            );
        }
    };
    const coursePage = renderCoursePage();

    const renderContent = () => {
        if (userData === null || teacherData === null) return (
            <div className={classes.content}>
                <div className={classes.errorContainer}>
                    <Typography variant={"h6"} className={classes.errorMessage}>
                        Sorry, but we cannot retrieve your information.
                        <br/>
                        <Link to="/teacher" className={classes.errorLink}>
                            Log in again.
                        </Link>
                    </Typography>
                </div>
            </div>
        );
        else {
            return (
                <div className={classes.content}>
                    {coursePage}
                </div>
            );
        }
    };
    const content = renderContent();

    useEffect(() => {
        renderCoursePage();
    });

    const initialCourseValues = {
        title: "",
        code: "",
        expiry_date: null,
    }

    const [courseValues, setCourseValues] = useState(initialCourseValues);

    const handleChange = (e, type) => {
        if (type === 'title') {
            setCourseValues(prevState => {
                return {...prevState, title: e.target.value}
            });
        } else if (type === 'date') {
            setCourseValues(prevState => {
                return {...prevState, expiry_date: e}
            });
        } else if (type === 'code') {
            setCourseValues(prevState => {
                return {...prevState, code: e.target.value}
            });
        }
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    const createCourse = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const [titleError, setTitleError] = useState(false);
    const [titleHelper, setTitleHelper] = useState("");
    const titleTag = (
        <TextField
            variant="outlined"
            label="Course Title"
            value={courseValues.title}
            className={classes.textField}
            onChange={e => handleChange(e, 'title')}
            required
            error={titleError}
            helperText={titleHelper}
        />
    );

    const dateTag = (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                label="Course End Date"
                value={courseValues.expiry_date}
                onChange={(newValue) => {
                    handleChange(moment(newValue).format('YYYY-MM-DD'), 'date')
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        className={classes.textField}
                        required
                    />
                }
                OpenPickerButtonProps={{edge: false}}
                components={{OpenPickerIcon: EventRoundedIcon}}
            />
        </LocalizationProvider>
    );

    const generateCode = async () => {
        let running = true;
        let result = "";
        let characters = "abcdefghijklmnopqrstuvwxyz";
        while (running) {

            // Generate code
            for (let i = 0; i < 17; i++) {
                if (i === 5 || i === 11) result += "-";
                else {
                    result += characters.charAt(Math.floor(Math.random() * characters.length))
                }
            }

            // make request with code
            // if request is okay, run again
            // else courseValues.code = result, stop running

            await axios.get('http://127.0.0.1:8000/courses/' + result)
                .catch(err => {
                    if (err.response.status === 404) {
                        setCourseValues(prevState => {
                            return {...prevState, code: result}
                        });
                    }
                    running = false;
                });
        }
    };

    const [codeError, setCodeError] = useState(false)
    const [codeHelper, setCodeHelper] = useState("")
    const codeTag = (
        <TextField
            variant="outlined"
            label="Course Code"
            value={courseValues.code}
            className={classes.textField}
            onChange={e => {
                handleChange(e, 'code')
            }}
            required
            error={codeError}
            helperText={codeHelper}
            InputProps={{
                endAdornment: (
                    <InputAdornment position={"end"}>
                        <IconButton onClick={generateCode}>
                            <AutorenewRoundedIcon/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );

    const dialogClear = () => {
        setCourseValues(initialCourseValues);
        setAlerts(renderAlerts(null));
        setTitleError(false);
        setTitleHelper("");
        setCodeError(false);
        setCodeHelper("");
    }

    const handleSubmit = async () => {

        // Validate
        let validate = true;
        if (courseValues.title === "") {
            setTitleError(true);
            setTitleHelper("Required Field");
            validate = false;
        } else {
            setTitleError(false);
            setTitleHelper("");
        }
        if (courseValues.code === "") {
            setCodeError(true);
            setCodeHelper("Required Field");
            validate = false;
        } else {
            setCodeError(false);
            setCodeHelper("");
        }

        if (validate) {
            await axios.post('http://127.0.0.1:8000/teachers/' + teacherData.id + "/courses/", courseValues)
                .then(r => {

                    const alert = (
                        <Grid item xs={12}>
                            <Alert severity="success">
                                Course created!
                            </Alert>
                        </Grid>
                    )

                    setAlerts(renderAlerts(alert));
                })
                .catch(err => {

                    console.log(err);

                    let alerts = [];

                    Object.values(err.response.data).forEach(item => {
                        alerts.push(
                            <Grid item xs={12}>
                                <Alert severity="error"> {item} </Alert>
                            </Grid>
                        );
                    });

                    setAlerts(renderAlerts(alerts));

                })
        }
    };

    const renderAlerts = (message) => {
        if (message === null) {
            return (
                <div hidden={true}/>
            )
        } else {
            return (
                <Grid container spacing={2} className={classes.gridContainer}>
                    {message}
                </Grid>
            );
        }
    };
    const [alerts, setAlerts] = useState(() => renderAlerts(null));

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/users/' + userData.id)
            .then(r => {
                userData = r.data;
                window.sessionStorage.setItem("userData", JSON.stringify(userData));
            }).catch(err => {
            console.log(err);
        })

        axios.get('http://127.0.0.1:8000/teachers/' + userData.id)
            .then(r => {
                teacherData = r.data;
                courses = teacherData.courses;

                window.sessionStorage.setItem("teacherData", JSON.stringify(teacherData));

            }).catch(err => {
            console.log(err);
        })
    }, [userData, teacherData, courses]);

    return (
        <div className={classes.courses}>
            <TeacherNav active={2}/>
            <TeacherCoursesBanner
                active={activePage}
                setActive={setActivePage}
            />
            {content}
            <Fab className={classes.fab} onClick={() => createCourse()}>
                <AddRoundedIcon/>
            </Fab>
            <Dialog open={dialogOpen} onClose={handleClose} className={classes.dialog}>
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseRoundedIcon/>
                    </IconButton>
                </DialogActions>
                <DialogTitle className={classes.dialogTitle}>Create Course</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {titleTag}
                    {dateTag}
                    {codeTag}
                    {alerts}
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button className={classes.dialogSubmit} onClick={dialogClear}>Clear</Button>
                    <Button className={classes.dialogSubmit} onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TeacherCourses;
