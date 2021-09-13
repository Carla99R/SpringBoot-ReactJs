import React, {useReducer} from 'react';
import StudentReducer from './StudentReducer';
import {getStudent, getStudents, addStudent, deleteStudent} from "../../global/petitions";
import StudentContext from "./StudentContext";

const StudentState = (props) => {

    const initialState = {
        students: [],
        selectedStudent: null,
        error: null
    }

    const [state, dispatch] = useReducer(StudentReducer, initialState)

    const allStudents = async () => {
        try {
            const res = await getStudents()
            dispatch({
                type: 'ALL_STUDENTS',
                payload: res,
                error: null
            })
        } catch (e) {
            console.log(e.response)
            dispatch({
                type: 'ALL_STUDENTS',
                payload: "",
                error: e.response
            })
        }
    }

    const addStudents = async (student) => {
        try {
            await addStudent(student)
            dispatch({
                type: 'ADD_STUDENT',
                payload: await getStudents(),
                error: null,
                message: `${student.name} successfully added`,
                description: `${student.name} was added to the system`
            })
        } catch (e) {
            dispatch({
                type: 'ADD_STUDENT',
                payload: await getStudents(),
                error: e.response,
                message: null,
                description: null
            })
        }
    }

    const deleteStudents = async (student) => {
        try {
            await deleteStudent(student.id)
            dispatch({
                type: 'DELETE_STUDENT',
                payload: await getStudents(),
                error: null,
                message: `${student.name} successfully deleted`,
                description: `${student.name} was deleted from the system`
            })
        } catch (e) {
            console.log(e.response)
            dispatch({
                type: 'DELETE_STUDENT',
                payload: await getStudents(),
                error: e.response,
                message: null,
                description: null
            })
        }
    }

    const IdStudent = async (studentId) => {
        const res = await getStudent(studentId)
        dispatch({
            type: 'ID_STUDENT',
            payload: res.json()
        })
    }

    return (
        <StudentContext.Provider value={{
            students: state.students,
            selectedStudent: state.selectedStudent,
            error: state.error,
            message: state.message,
            description: state.description,
            allStudents,
            IdStudent,
            addStudents,
            deleteStudents
        }}>
            {props.children}
        </StudentContext.Provider>
    )
}
export default StudentState;





