import logoRegular from '../images/eco-regular.svg';
import logoHorizontal from '../images/eco-horizontal.svg';
import {Button, makeStyles} from "@material-ui/core";


const useStyles = makeStyles( theme => ({
    navbar: {
        padding: "20px",
        width: "100%",
    },
    button: {
        color: "#f7f7f7",
        backgroundColor: "#60992d",
        cursor: "pointer",
        margin: "20px auto",
        width: "150px",
        border: "0",
        borderRadius: "20px",
        "&:hover": {
            backgroundColor: "#46494c",
        }
    },
    logoHorizontal: {
        width: "150px",
        height: "auto",
        padding: "10px",
        cursor: "pointer",
    },
    logoRegular: {
        width: "80px",
        height: "auto",
        padding: "5px 25px",
        cursor: "pointer",
    }

}))




const HomeNavBar = () => {

    const classes = useStyles();

    return (
        <nav className={classes.navbar}>
            <img src={logoHorizontal}
                 className={classes.logoHorizontal}
                 alt="logo-horizontal"
            />
            <Button variant="outlined"
                    className={classes.button}
            >
                Student
            </Button>
            <Button variant="outlined"
                    className={classes.button}
            >
                Student
            </Button>
            <Button variant="outlined"
                    className={classes.button}
            >
                Student
            </Button>
        </nav>
    )
}

export default HomeNavBar;