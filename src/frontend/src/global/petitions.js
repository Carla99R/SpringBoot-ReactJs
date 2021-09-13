import {checkStatus} from "./functions";
import axios from "axios";

export const deleteStudent = async (studentId) => {
    const res = await axios.delete(`api/v1/students/${studentId}`)
    checkStatus(res)
    return res.data;
}

export const addStudent = async (student) => {
    const res = await axios.post(`api/v1/students`, student)
    checkStatus(res)
    return res.data;
}

export const getStudent = async (studentId) => {
    const res = await axios.get(`api/v1/students/${studentId}`)
    checkStatus(res)
    return res.data;
}

export const getStudents = async () => {
    const res = await axios.get(`api/v1/students`)
    checkStatus(res)
    return res.data;
}