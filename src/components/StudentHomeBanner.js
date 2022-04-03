import {makeStyles} from "@mui/styles";
import {Typography} from "@mui/material";

const useStyles = makeStyles(theme => ({
    banner: {
        padding: "80px 0 0 0",
        backgroundColor: "#f7f7f7",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    },
    headerContainer: {
        display: "flex",
        justifyContent: "center",
    },
    header: {
        padding: "15px",
    },
    textContainer: {
        display: "flex",
        justifyContent: "center",
    },
}));


const StudentHomeBanner = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <div className={classes.headerContainer}>
                <Typography variant={"h3"} className={classes.header}>
                    Hi, {props.firstName}
                </Typography>
            </div>
        </div>
    );
}

export default StudentHomeBanner;