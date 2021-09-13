import './App.css';
import React from 'react';
import Client from './pages/client'
import StudentState from "./Context/Student/StudentState";
import PopConfirm from "./components/popconfirm";

function App() {
    return (
        <>
            <StudentState>
                <Client/>
            </StudentState>
        </>
    );
}

export default App;