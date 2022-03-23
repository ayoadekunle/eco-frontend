import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import Home from "./pages/Home";
import EmailConfirm from "./pages/EmailConfirm";


const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: `"Heiti SC", serif`,
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className={"app"}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/student" element={<StudentLogin />} />
                        <Route path="/teacher" element={<TeacherLogin />} />
                        <Route path="/email-confirmation" element={<EmailConfirm />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    )
};

export default App;
