import {Grid} from "@mui/material";
import logo from "../images/teacher-logo.png";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";


const useStyles = makeStyles(theme => ({
    navbar: {
        padding: "10px 60px",
        backgroundColor: "#f7f7f7",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    },
    logoContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: "40px",
        padding: "10px",
    },
    linksContainer: {
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
    },
    link: {
        color: "black",
        padding: "15px",
        margin: "0 10px",
        fontSize: "17px",
        fontWeight: 500,
        textDecoration: "none",
        cursor: "pointer",
        transition: "0.1s",
        "&:hover": {
            color: "#fbb03b",
        },
    },
    activeLink: {
        color: "#fbb03b",
        textDecoration: "none",
        padding: "15px",
        margin: "0 10px",
        fontSize: "17px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "0.1s",
    },
    iconsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        color: "#46494C",
        padding: "5px",
        margin: "0 5px",
        cursor: "pointer",
    },
}));

const TeacherNav = (props) => {

    const classes = useStyles();

    return (
        <Grid container spacing={0} className={classes.navbar}>
            <Grid item xs={1} className={classes.logoContainer}>
                <Link to="/">
                    <img src={logo} className={classes.logo} alt="logo"/>
                </Link>
            </Grid>
            <Grid item xs={9} className={classes.linksContainer}>
                <Grid container>
                    <Grid item >
                        <Link to="/teacher/dashboard"
                              className={props.active === 1 ? classes.activeLink : classes.link}
                        >
                            Home
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/teacher/courses"
                              className={props.active === 2 ? classes.activeLink : classes.link}
                        >
                            Courses
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} className={classes.iconsContainer}>
                <div>
                    <AccountCircleRoundedIcon
                        className={classes.icon}
                        sx={{fontSize: 30}}
                    />
                    <NotificationsRoundedIcon
                        className={classes.icon}
                        sx={{fontSize: 30}}
                    />
                </div>
            </Grid>
        </Grid>
    )
};

export default TeacherNav;
