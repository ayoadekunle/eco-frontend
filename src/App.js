import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/student" element={<StudentLogin />} />
                <Route path="/teacher" element={<TeacherLogin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
                               