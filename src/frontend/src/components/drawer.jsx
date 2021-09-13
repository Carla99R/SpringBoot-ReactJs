import {Drawer, Form, Button, Col, Row, Input, Select, Divider} from 'antd';
import styles from '../styles/client.module.css';
import React, {useState} from "react";
import {successNotification, errorNotification, warningNotification} from "./notification";
import useWindowDimensions from "./windowsDimensions";

const {Option} = Select;

const NewClient = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        gender: "",
        loading: false
    })
    const [form] = Form.useForm();

    const onClose = () => {
        props.setShowDrawer(false)
        form.resetFields()
    };


    const addNewStudent = async (student) => {
        setState({loading: true})
        try {
            await props.addStudents(student)
            setState({loading: false})
            onClose()

        } catch (ex) {
            setState({loading: false})
            errorNotification(
                `Status ${ex.response.status}`,
                `${ex.response.statusText}`)
        }
    }

    const onFinish = async (student) => {
        console.log(JSON.stringify(student, null, 2));
        await addNewStudent(student)
    };

    const onFinishFailed = errorInfo => {
        for (let i = 0; i < errorInfo.errorFields.length; i++) {
            warningNotification(
                "Be carefull",
                errorInfo.errorFields[i].errors[0]
            )
        }
    };

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const {width} = useWindowDimensions();

    return (
        <>
            <Drawer
                title={
                    <div style={{display: "flex", padding: "0 0 10px 0"}}>
                        <p className={styles.title}>Create new student</p>
                    </div>
                }
                width={width <= 700 ? width : 500}
                onClose={onClose}
                visible={props.showDrawer}
                bodyStyle={{paddingBottom: 90, overflow: 'scroll'}}
            >
                <div className={styles.client}>
                    <img
                        src={"https://image.freepik.com/free-vector/resume-writi…r-candidate-profile-career-summary_335657-143.jpg"}
                        alt={"New Student"}/>
                </div>
                <Form layout="vertical"
                      onFinishFailed={onFinishFailed}
                      onFinish={onFinish}
                      form={form}
                      hideRequiredMark
                      initialValues={{}}
                >
                    < Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter student name'}]}
                            >
                                <Input placeholder="Please enter student name" onChange={handleChange}
                                       name="name"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{required: true, message: 'Please enter student email'}]}
                                onChange={handleChange}
                            >
                                <Input placeholder="Please enter student email" onChange={handleChange}
                                       name="email"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="gender"
                                label="gender"
                                rules={[{required: true, message: 'Please select a gender'}]}
                                onChange={handleChange}
                            >
                                <Select placeholder="Please select a gender">
                                    <Option value="MALE">MALE</Option>
                                    <Option value="FEMALE">FEMALE</Option>
                                    <Option value="OTHER">OTHER</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider/>
                    <Form.Item
                        className={styles.botones}
                    >
                        <Button className={styles.boton} id={styles.submit} htmlType="submit"
                                loading={state.loading}>
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Drawer>


        </>
    )
}

export default NewClient;

