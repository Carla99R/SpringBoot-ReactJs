import React, {useState, useEffect, useContext} from 'react'
import {Layout, Breadcrumb, Spin, Empty, Image} from 'antd';
import styles from '../styles/client.module.css';
import ClientsTable from '../components/clientsTable';
import PopConfirm from "../components/popconfirm";
import StudentContext from "../Context/Student/StudentContext";
import SiderMenu from "../components/sider";
import {errorNotification, successNotification} from "../components/notification";
import {Footer} from "antd/es/layout/layout";
import PiePagina from "../assets/images/R.png"

const Client = () => {

    const {Header, Content} = Layout;

    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([{}]);

    const {
        students,
        allStudents,
        addStudents,
        deleteStudents,
        error,
        message,
        description
    } = useContext(StudentContext);
    let c = []

    const cols = []
    const values = []

    const fetchStudents = async () => {
        await allStudents()
    }

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents()

    }, [])

    useEffect(() => {
        setLoading(false)
        if (error !== null) {
            errorNotification(
                `[${error.status}] ${error.statusText}`,
                `${error.data.message}`)

        } else if (message !== undefined && description !== undefined) {
            successNotification(
                `${message}`,
                `${description}`)
        }

        table(students)

    }, [students])


    const validateCols = (col) => {
        let repeated = false;

        for (let i = 0; i < cols.length; i++) {
            if (cols[i] === col) {
                repeated = true;
            }
        }

        return repeated;
    }

    const table = () => {

        for (let k in students) {
            const value = {}
            value.action =
                <PopConfirm student={students[k]} deleteStudent={deleteStudents} fetchStudents={allStudents}
                            error={error}/>
            for (let k2 in students[k]) {
                if (!validateCols(k2)) {
                    const params = {}
                    params.field = k2
                    params.headerName = k2
                    params.width = 150
                    cols.push(k2)
                    c.push(params)

                }
                value[k2] = students[k][k2]

            }
            values.push(value)
        }
        const value = {}

        values.push(value)

        const params = {}
        params.field = "action"
        params.headerName = "action"
        params.width = 150
        cols.push("action")
        c.push(params)

        setColumns(c)
        setData(values)
    }


    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <SiderMenu/>
                <Header className={styles.bg} style={{padding: 0}}/>
                <Content style={{margin: '16px 20px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        < Image style={{display: 'flex', justifyContent: 'center'}}
                                width={40}
                                src={PiePagina}
                        />
                    </Breadcrumb>
                    <div className={styles.bg} style={{padding: 24, minHeight: 600}}>
                        {loading ?
                            <div className={styles.spin}>
                                <Spin tip="Loading..." size="large"/>
                            </div>
                            :
                            <ClientsTable cols={columns} values={data}
                                          students={students.length} add={addStudents} error={error}
                                          fetchStudents={allStudents}/>

                        }
                    </div>

                </Content>
            </Layout>

        </>

    )
}


export default Client;
