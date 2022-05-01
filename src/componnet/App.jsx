import ReactDom from "react-dom";
import React, { useState } from "react";
import Game from "./Board";
import Header from "./header";



function App(props) {

    const [loogin, setloogin] = useState(true);

    function chingelogin() {
        console.log(loogin)
        if (loogin) {
            setloogin(false)
        } else {
            setloogin(true)
        }
    }

    return (<div>
        <button onClick={chingelogin}>clik me</button>
        {loogin ? login() : login_not(props)}
    </div>)
}


function login() {
    return (
        <h1>login page</h1>
    )
}

// game={props.game}
function login_not(props) {
    return (
        <div>
            <Header text="chess game"></Header>
            <Game />
        </div>
    )
}

export default App