import {getStudentData, getUserData} from "../components/UserData";
import StudentNav from "../components/StudentNav";
import {
    Alert,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {useEffect, useState} from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from "axios";
import StudentCoursesBanner from "../components/StudentCoursesBanner";
import {StarBorderOutlined, StarRounded} from "@mui/icons-material";


const useStyles = makeStyles(theme => ({
    courses: {
        height: "100%",
    },
    content: {
        display: "flex",
        justifyContent: "center",
        padding: "45px 65px",
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
            color: "#7dc241",
        },
    },
    fab: {
        "&.MuiFab-root": {
            position: "fixed",
            right: "30px",
            bottom: "30px",
            color: "#f7f7f7",
            backgroundColor: "#7dc241",
            "&:hover": {
                backgroundColor: "#7dc241",
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
            color: "#7dc241"
        },
        "&.MuiButton-root": {
            "&:hover": {
                backgroundColor: "#f5faf0",
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
            color: "#7dc241",
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: "#7dc241",
            },
        },
    },
    gridContainer: {
        marginBottom: "16px",
        justifyContent: "space-around",
    },
    gridItem: {},
    card: {
        height: "300px",
        width: "250px",
    },
    cardMedia: {
        height: "65%",
        width: "100%",
        "&: MuiButton-root": {
            borderRadius: "0px",
        }
    },
    cardInfo: {
        display: "flex",
        justifyContent: "center",
    },
    cardContent: {
        width: "100%",
        display: "inline-flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
    },
}));

const StudentCourses = () => {

    const classes = useStyles();
    let userData = getUserData();
    let studentData = getStudentData();

    if (userData === null) {
        userData = JSON.parse(window.sessionStorage.getItem("userData"));
    } else {
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
    }

    if (studentData === null) {
        studentData = JSON.parse(window.sessionStorage.getItem("studentData"));
    } else {
        window.sessionStorage.setItem("studentData", JSON.stringify(studentData));
    }

    let courses = studentData.courses;

    const [activePage, setActivePage] = useState(1);

    const [dialogOpen, setDialogOpen] = useState(false);

    const createCourse = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const renderCoursePage = () => {
        // filter courses for cards
        if (activePage === 1) { // All

            const getCards = () => {
                let cards = []
                for (let i = 0; i < courses.length; i++) {
                    cards.push(
                        <Grid item className={classes.gridItem}>
                            <Card className={classes.card}>
                                <div className={classes.cardMedia}
                                     style={{backgroundColor: courses[i]["color"]}}
                                />
                                <div className={classes.cardInfo}>
                                    <div className={classes.cardContent}>
                                        <Typography variant={"body1"}>
                                            {courses[i]["title"]}
                                        </Typography>
                                        <IconButton>
                                            <StarBorderOutlined />
                                        </IconButton>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                    )
                }
                return cards
            }

            return (
                <Grid container className={classes.gridContainer} spacing={5}>
                    {getCards()}
                </Grid>
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
        if (userData === null || studentData === null) {
            return (
                <div className={classes.content}>
                    <div className={classes.errorContainer}>
                        <Typography variant={"h6"} className={classes.errorMessage}>
                            Sorry, but we cannot retrieve your information.
                            <br/>
                            <Link to="/student" className={classes.errorLink}>
                                Log in again.
                            </Link>
                        </Typography>
                    </div>
                </div>
            );
        } else if (courses.length === 0) {
            return (
                <div className={classes.content}>
                    <div className={classes.errorContainer}>
                        <Typography variant={"h6"} className={classes.errorMessage}>
                            You have no courses added.
                            <br/>
                            <span className={classes.errorLink} onClick={() => createCourse()}>
                                Add Courses.
                            </span>
                        </Typography>
                    </div>
                </div>
            )
        } else {
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
        code: "",
    }

    const [courseValues, setCourseValues] = useState(initialCourseValues);

    const handleChange = (e, type) => {
        if (type === 'code') {
            setCourseValues(prevState => {
                return {...prevState, code: e.target.value}
            });
        }
    }

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
        />
    );

    const dialogClear = () => {
        setCourseValues(initialCourseValues);
        setAlerts(renderAlerts(null));
        setCodeError(false);
        setCodeHelper("");
    }

    const handleSubmit = async () => {

        // Validate
        let validate = true;
        if (courseValues.code === "") {
            setCodeError(true);
            setCodeHelper("Required Field");
            validate = false;
        } else {
            setCodeError(false);
            setCodeHelper("");
        }

        if (validate) {
            await axios.post('http://127.0.0.1:8000/students/' + studentData.id + "/courses/" + courseValues.code + '/')
                .then(r => {

                    console.log(r.data);

                    const alert = (
                        <Grid item xs={12}>
                            <Alert severity="success">
                                Course added!
                            </Alert>
                        </Grid>
                    )

                    setAlerts(renderAlerts(alert));

                    courses.push(r.data);
                    renderCoursePage();
                })
                .catch(err => {

                    if (err.status === 404) {
                        let alerts = [];
                        alerts.push(
                            <Grid item xs={12}>
                                <Alert severity="error">Course does not exist</Alert>
                            </Grid>
                        );
                        setAlerts(renderAlerts(alerts));
                    } else if (err.response) {
                        let alerts = [];

                        Object.values(err.response.data).forEach(item => {
                            alerts.push(
                                <Grid item xs={12}>
                                    <Alert severity="error"> {item} </Alert>
                                </Grid>
                            );
                        });

                        setAlerts(renderAlerts(alerts));
                    } else if (err.request) {
                        console.log(err.request)
                    } else {
                        console.log(err.message);
                    }
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

        axios.get('http://127.0.0.1:8000/users/' + userData.id + '/')
            .then(r => {
                userData = r.data;
                window.sessionStorage.setItem("userData", JSON.stringify(userData));
            }).catch(err => {
            console.log(err);
        })

        axios.get('http://127.0.0.1:8000/students/' + userData.id + '/')
            .then(r => {
                studentData = r.data;
                courses = studentData.courses;
                window.sessionStorage.setItem("studentData", JSON.stringify(studentData));
            }).catch(err => {
            console.log(err);
        })
    }, [userData, studentData, courses]);

    return (
        <div className={classes.courses}>
            <StudentNav active={2}/>
            <StudentCoursesBanner
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
                <DialogTitle className={classes.dialogTitle}>Join Course</DialogTitle>
                <DialogContent className={classes.dialogContent}>
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

export default StudentCourses;
