import {makeStyles} from "@mui/styles";
import {TextField, Typography} from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {useState} from "react";

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
    utils: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    nav: {
        display: "inline-flex",
        justifyContent: "space-evenly",
        minWidth: "250px",
    },
    link: {
        padding: "18px",
        cursor: "pointer",
        "&.MuiTypography-root": {
            margin: "0 10px",
            "&:hover": {
                borderBottom: "solid 3px #7dc241",
            }
        },
    },
    activeLink: {
        padding: "18px",
        cursor: "pointer",
        "&.MuiTypography-root": {
            margin: "0 10px",
            borderBottom: "solid 3px #7dc241",
        },
    },
    searchBar: {
        position: "absolute",
        left: 0,
        margin: "0 40px",
        minWidth: "200px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    },
    searchIcon: {
        padding: "5px",
        cursor: "pointer",
    },
    textInput: {
        width: "160px",
        "& .MuiInput-root": {
            height: "30px",
            fontSize: "16px",
            "&::after": {
                borderBottomColor: "#7dc241",
            },
        },
    },
}));

const SearchBar = () => {

    let [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const classes = useStyles();

    const [active, setActive] = useState(false);

    const renderTextInput = () => {
        if (!active) {
            return (
                <div hidden={true}/>
            );
        } else {
            return (
                <TextField variant={"standard"} className={classes.textInput} onChange={e => handleSearchChange(e)}/>
            );
        }
    };
    const [textInput, setTextInput] = useState(() => renderTextInput());

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            console.log(searchValue);
            // make request
        }
    };

    return (
        <div className={classes.searchBar} onKeyDown={handleSearch}>
            <SearchRoundedIcon className={classes.searchIcon}
                               sx={{fontSize: 32}}
                               onClick={() => {
                                   setActive(!active)
                                   setTextInput(renderTextInput())
                               }}
            />
            {textInput}
        </div>
    );
};

const Nav = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.nav}>
            <Typography
                variant={"body2"}
                className={props.active === 1 ? classes.activeLink : classes.link}
                onClick={() => props.setActive(1)}
            >
                All
            </Typography>
            <Typography
                variant={"body2"}
                className={props.active === 2 ? classes.activeLink : classes.link}
                onClick={() => props.setActive(2)}
            >
                Starred
            </Typography>
            <Typography
                variant={"body2"}
                className={props.active === 3 ? classes.activeLink : classes.link}
                onClick={() => props.setActive(3)}
            >
                Active
            </Typography>
            <Typography
                variant={"body2"}
                className={props.active === 4 ? classes.activeLink : classes.link}
                onClick={() => props.setActive(4)}
            >
                Concluded
            </Typography>
        </div>
    );
};

const StudentCoursesBanner = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <div className={classes.headerContainer}>
                <Typography variant={"h3"} className={classes.header}>
                    Courses
                </Typography>
            </div>
            <div className={classes.utils}>
                <SearchBar/>
                <Nav
                    active={props.active}
                    setActive={props.setActive}
                />
            </div>
        </div>
    );
};

export default StudentCoursesBanner;
