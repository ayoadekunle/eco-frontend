import {Grid, Typography} from "@mui/material";
import logo from "../images/logo.png";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';


const useStyles = makeStyles(theme => ({
    navbar: {
        padding: "10px 60px",
        backgroundColor: "#f7f7f7",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        zIndex: 1,
        // boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
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
        padding: "15px",
        fontSize: "15px",
        cursor: "pointer",
        transition: "0.1s",
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
            color: "#7dc241",
        },
        "&.MuiTypography-root": {
            fontWeight: 600,
        }
    },
    activeLink: {
        padding: "15px",
        fontSize: "15px",
        cursor: "pointer",
        transition: "0.1s",
        margin: "15px 0",
        color: "#7dc241",
        textDecoration: "none",
        "&.MuiTypography-root": {
            fontWeight: 600,
        }
    },
    iconsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icons: {
        width: "70%",
        display: "flex",
        justifyContent: "space-evenly",
    },
    icon: {
        color: "#46494C",
        padding: "5px",
        margin: "0 5px",
        cursor: "pointer",
    },
}));

const StudentNav = (props) => {

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
                    <Grid item>
                        <Typography component={Link} to="/student/dashboard" variant={"body2"}
                                    className={props.active === 1 ? classes.activeLink : classes.link}
                        >
                            Home
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component={Link} to="/student/courses" variant={"body2"}
                                    className={props.active === 2 ? classes.activeLink : classes.link}
                        >
                            Courses
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} className={classes.iconsContainer}>
                <div className={classes.icons}>
                    <AccountCircleRoundedIcon
                        className={classes.icon}
                        sx={{fontSize: 25}}
                    />
                    <NotificationsRoundedIcon
                        className={classes.icon}
                        sx={{fontSize: 25}}
                    />
                </div>
            </Grid>
        </Grid>
    )
}

export default StudentNav;
