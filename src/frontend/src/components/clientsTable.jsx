import {Badge, Button, Divider, Empty, Tooltip} from 'antd';
import styles from '../styles/client.module.css';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import {PlusOutlined, TeamOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import NewClient from "./drawer";
import Avatar from "antd/es/avatar/avatar";
import {
    IconButton,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TablePagination,
    TableRow, useTheme
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function LastPageIcon() {
    return null;
}

function FirstPageIcon() {
    return null;
}

function KeyboardArrowRight() {
    return null;
}

function KeyboardArrowLeft() {
    return null;
}

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}


TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const ClientsTable = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);

    const columns = () => (
        props.cols.map((col) => (
            <>
                <TableCell>{col.headerName.toUpperCase()}</TableCell>
            </>
        ))
    )

    const data = () => (
        props.values.map((value) => (
            <>
                <TableRow>
                    <TableCell className={classes.tableCell}>{value.id}</TableCell>
                    <TableCell className={classes.tableCell}>{value.name}</TableCell>
                    <TableCell className={classes.tableCell}>{value.email}</TableCell>
                    <TableCell className={classes.tableCell}>{value.gender}</TableCell>
                    <TableCell className={classes.tableCell}>{value.action}</TableCell>
                </TableRow>
            </>
        ))
    )

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
            borderCollapse: 'collapse'
        },
        root: {
            width: '100%',
        },
        tableCell: {
            borderTop: 'none',
            borderBottom: 'none',
            borderCollapse: 'collapse'
        },
        pagination: {
            borderTop: 'none',
            borderBottom: 'none',
            borderCollapse: 'collapse',
            marginRight: '5%'
        },
    });

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>
            <div style={{height: '80vh'}} className={classes.root}>
                <div className={styles.header}>
                    <Button className={styles.boton} onClick={() => setShowDrawer(!showDrawer)} icon={<PlusOutlined/>}>
                        <h1
                            className={styles.hide}>Add student</h1></Button>
                    <div>
                        <Tooltip placement="top" title={"Number of students"}>
                            <Avatar
                                size={{
                                    xs: 24,
                                    sm: 32,
                                    md: 40,
                                    lg: 30,
                                    xl: 44,
                                    xxl: 50,
                                }} icon={<TeamOutlined/>}/>
                            <Badge count={props.students} className="site-badge-count-4"/>
                        </Tooltip>

                    </div>
                </div>
                <NewClient
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={props.fetchStudents}
                    addStudents={props.add}
                    error={props.error}
                />
                <Divider/>

                {props.students <= 0 ?
                    <div className={styles.tabla} id={styles.empty}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                    </div> :
                    <div>
                        <TableContainer>
                            <Table className={classes.table} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        {props.cols && columns()}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.values && data()}
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                        colSpan={12}
                                        count={props.values.length}
                                        rowsPerPage={5}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {'aria-label': 'rows per page'},
                                            native: true
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                        className={classes.pagination}
                                    />
                                </TableBody>

                            </Table>
                        </TableContainer>

                    </div>}

            </div>

        </>
    )

}
export default ClientsTable;

