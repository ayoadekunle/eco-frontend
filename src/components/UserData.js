import axios from "axios";

let userData = null;
let studentData = null;
let teacherData = null;

export const setUserData = (data) => {
    userData = data;
};

export const getUserData = () => {
    return userData;
};

export const setStudentData = (data) => {
    studentData = data;
}

export const getStudentData = () => {
    return studentData;
};

export const setTeacherData = (data) => {
    teacherData = data;
};

export const getTeacherData = () => {
    return teacherData;
};
