import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import Home from "./pages/Home";
import EmailConfirm from "./pages/EmailConfirm";
import StudentHome from "./pages/StudentHome";
import TeacherHome from "./pages/TeacherHome";
import TeacherCourses from "./pages/TeacherCourses";
import StudentCourses from "./pages/StudentCourses";


const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    margin: "15px 0",
                },
            },
        },
    },
    typography: {
        fontFamily: `"Raleway", sans-serif`,
        button: {
            "&.nav-button": {
                fontFamily: `"Red Hat Text", serif`,
            },
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className={"app"}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="/student" element={<StudentLogin/>}/>
                        <Route path="/teacher" element={<TeacherLogin/>}/>
                        <Route path="/email-confirmation" element={<EmailConfirm/>}/>
                        <Route path="/student/dashboard" element={<StudentHome/>}/>
                        <Route path="/teacher/dashboard" element={<TeacherHome/>}/>
                        <Route path="/teacher/courses" element={<TeacherCourses/>}/>
                        <Route path="/student/courses" element={<StudentCourses/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    )
};

export default App;
