import logoHorizontal from '../images/eco-horizontal.png';
import {makeStyles} from "@mui/styles";
import {Button} from "@mui/material";

const useStyles = makeStyles(theme => ({
    navContainer: {
        padding: "20px 60px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#f7f7f7",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    },
    logo: {
        width: "110px",
        height: "auto",
    },
    buttons: {
        width: "300px",
        display: "flex",
        justifyContent: "space-evenly",
    },
    studentButton: {
        fontSize: "14px",
        width: "120px",
        height: "45px",
        border: "none",
        borderRadius: "5px",
        margin: "0 5px",
        cursor: "pointer",
        textDecoration: "none",
        transition: "50ms",
        "&.MuiButton-text": {
            color: "#7dc241",
            "&:hover": {
                border: "solid 1px #7dc241",
                backgroundColor: "#f5faf0",
            },
        },
    },
    teacherButton: {
        fontSize: "14px",
        width: "120px",
        height: "45px",
        border: "none",
        borderRadius: "5px",
        margin: "0 5px",
        cursor: "pointer",
        transition: "50ms",
        "&.MuiButton-text": {
            color: "#fbb03b",
            "&:hover": {
                border: "solid 1px #fbb03b",
                backgroundColor: "#fff9ef",
            },
        },
    },
}));

const HomeNavBar = () => {

    const classes = useStyles();

    return (
        <div className={classes.navContainer}>
            <img src={logoHorizontal} alt="logo-horizontal" className={classes.logo}/>
            <div className={classes.buttons}>
                <Button href="/student" className={`${classes.studentButton} nav-button`}>
                    Student
                </Button>
                <Button href="/teacher" className={`${classes.teacherButton} nav-button`}>
                    Teacher
                </Button>
            </div>
        </div>
    )
}

export default HomeNavBar;
