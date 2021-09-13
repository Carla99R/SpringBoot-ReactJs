import {Popconfirm} from 'antd';
import {errorNotification, successNotification} from "./notification";
import {useContext} from "react";
import StudentContext from "../Context/Student/StudentContext";

const PopConfirm = (props) => {

    const {error} = useContext(StudentContext);


    const confirm = async (e) => {
        try {
            await props.deleteStudent(props.student)
            console.log(error)

        } catch (ex) {
            errorNotification(
                `Status ${ex.response.status}`,
                `${ex.response.statusText}`)
        }
    }

    return (
        <Popconfirm
            title={`Are you sure to delete ${props.student.name}?`}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <a href="#">Delete</a>
        </Popconfirm>
    );
}
export default PopConfirm;
