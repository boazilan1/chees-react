import ReactDom from "react-dom";
import React from "react";
import Board from "./componnet/Board";
import Header from "./componnet/header";
import App from "./componnet/App";
const games = require(__dirname + "/game.js")

var game1 = new games.Ob_game(8, "clasic");

ReactDom.render( <
    App / >
 ,
    document.getElementById("root"))