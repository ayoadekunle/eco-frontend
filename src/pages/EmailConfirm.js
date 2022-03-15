import logo from '../images/eco-regular.png'
import {makeStyles} from "@mui/styles";
import {Link, Typography} from "@mui/material";

const useStyles = makeStyles(theme => ({

}))

const EmailConfirm = () => {

    const classes = useStyles()

    return (
        <div>
            {logo}
            <p>Your email has been confirmed!
                <Link to="/student">Log in as student</Link>
                <Link to="/teacher">Log in as teacher</Link>
            </p>
        </div>
    )
}

export default EmailConfirm
