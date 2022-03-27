import logoHorizontal from '../images/eco-horizontal.png';
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";

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
        display: "flex",
        alignItems: "center",
    },
    studentButton: {
        fontFamily: `Red Hat Text, serif`,
        fontSize: "14px",
        backgroundColor: "#f7f7f7",
        width: "120px",
        height: "45px",
        border: "none",
        borderRadius: "5px",
        color: "#7dc241",
        margin: "0 5px",
        cursor: "pointer",
        transition: "50ms",
        "&:hover": {
            border: "solid 1px #7dc241",
        },
    },
    teacherButton: {
        fontFamily: `Red Hat Text, serif`,
        fontSize: "14px",
        backgroundColor: "#f7f7f7",
        width: "120px",
        height: "45px",
        border: "none",
        borderRadius: "5px",
        color: "#fbb03b",
        margin: "0 5px",
        cursor: "pointer",
        transition: "50ms",
        "&:hover": {
            border: "solid 1px #fbb03b",
        },
    },
}));

const HomeNavBar = () => {

    const classes = useStyles();

    return (
        <div className={classes.navContainer}>
             <img src={logoHorizontal} alt="logo-horizontal" className={classes.logo}/>
             <div className={classes.buttons}>
                 <Link to="/student">
                     <button className={classes.studentButton}>STUDENT</button>
                 </Link>
                 <Link to="/teacher/">
                     <button className={classes.teacherButton}>TEACHER</button>
                 </Link>
             </div>
        </div>
    )
}

export default HomeNavBar;
