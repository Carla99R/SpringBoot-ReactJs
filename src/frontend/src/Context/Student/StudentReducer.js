import {ADD_STUDENT, ALL_STUDENTS, DELETE_STUDENT, ID_STUDENT} from '../types'

export default (state, action) => {
    const {payload, type, error, message, description} = action;

    switch (type) {
        case ALL_STUDENTS:
        case DELETE_STUDENT:
        case ADD_STUDENT:
            return {
                ...state,
                students: payload,
                error: error,
                message: message,
                description: description
            }
        case ID_STUDENT:
            return {
                ...state,
                selectedStudent: payload,
                error: error
            }
        default:
            return state;
    }
}