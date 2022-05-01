//const React = require("react");
import ReactDom from "react-dom";
import React, { useState } from "react";
import { board, boare_arr } from "./boardJson";



function Row(props) {


  let box_clases = props.row;

  let classNames = []
  for (let i = 0; i < 8; i++) {

    const { id, mat_id, color, tipey, move, possibleMoveTo } = box_clases[i];
    classNames[i] = [box_clases[i].tipey, box_clases[i].color].join(' ')

    const [row, colom] = box_clases[i].mat_id
    if ((row + colom) % 2 == 0) {
      classNames[i] += ' black_box'
    } else {
      classNames[i] += ' white_box'
    }
    if (possibleMoveTo) {
      classNames[i] += ' can_go'
    }

  }

  return <tr>
    <td onClick={e => props.handleBoardClick(e, box_clases[0])} className={classNames[0]}> </td>
    <td onClick={e => props.handleBoardClick(e, box_clases[1])} className={classNames[1]}> </td>
    <td onClick={e => props.handleBoardClick(e, box_clases[2])} className={classNames[2]}> </td>
    <td onClick={e => props.handleBoardClick(e, box_clases[3])} className={classNames[3]}> </td>
    <td onClick={e => props.handleBoardClick(e, box_clases[4])} className={classNames[4]}> </td>
    <td onClick={e => props.handleBoardClick(e, box_clases[5])} className={classNames[5]}> </td>
    <td onClick={e => props.handleBoardClick(e, box_clases[6])} className={classNames[6]}> </td>
    <td onClick={e => props.handleBoardClick(e, box_clases[7])} className={classNames[7]}> </td>
  </tr>
}

function Board(props) {

  return <table className="senter">
    <Row row={props.board[0]} handleBoardClick={props.handleBoardClick} />
    <Row row={props.board[1]} handleBoardClick={props.handleBoardClick} />
    <Row row={props.board[2]} handleBoardClick={props.handleBoardClick} />
    <Row row={props.board[3]} handleBoardClick={props.handleBoardClick} />
    <Row row={props.board[4]} handleBoardClick={props.handleBoardClick} />
    <Row row={props.board[5]} handleBoardClick={props.handleBoardClick} />
    <Row row={props.board[6]} handleBoardClick={props.handleBoardClick} />
    <Row row={props.board[7]} handleBoardClick={props.handleBoardClick} />

  </table>

}
// const [bo, setBo] = useState(board)
function Game(props) {

  const [BoardArray, setBoard] = useState(boare_arr);
  let [Turn, setTurn] = useState("white");
  const [piceToMove, setpiceToMove] = useState(null);
  const [chessState, setChessState] = useState(false);
  const [gameMoves, setgameMoves] = useState([]);

  function chingeTurn() {
    if (Turn === "white") {
      Turn = "black"
      setTurn("black");
    } else {
      Turn = "white"
      setTurn("white");
    }
  }
  function ArraypossibleMove(picec) {
    const { tipey } = picec
    let moves, moves_ret = []
    switch (tipey) {
      case "Pawn":
        return Where_can_Pawn_go(picec);
      case "Bishop":
        moves = Where_can_Bishop_go(picec);

        break;
      case "Knight":
        return Where_can_Knight_go(picec);
      case "Rook":
        moves = Where_can_Rook_go(picec);
        break;
      case "Queen":
        moves = Where_can_Queen_go(picec);
        break;
      case "King":
        return Where_can_King_go(picec);

    }
    for (let m_1 = 0; m_1 < moves.length; m_1++) {
      for (let m_2 = 0; m_2 < moves[m_1].length; m_2++) {
        moves_ret.push(moves[m_1][m_2]);

      }
    }

    return moves_ret;
  }
  function Where_can_Bishop_go(picec) {
    const { id, mat_id, color, tipey, move, possibleMoveTo } = picec;

    let possible_position = [];
    possible_position.push(Diagonal_move(mat_id, -1, 1));
    possible_position.push(Diagonal_move(mat_id, 1, -1));
    possible_position.push(Diagonal_move(mat_id, -1, -1));
    possible_position.push(Diagonal_move(mat_id, 1, 1));
    return possible_position;
  }
  function Where_can_Pawn_go(picecs) {


    const { id, mat_id, color, tipey, move, possibleMoveTo } = picecs;
    const [row, colom] = mat_id

    let position = mat_id;
    let possible_position = [];
    if (Turn === "black") {

      let next_pos = [0, 0];
      next_pos[0] = position[0] - 1;
      next_pos[1] = position[1];

      let next_pos1 = [0, 0];
      next_pos1[0] = position[0] - 1;
      next_pos1[1] = position[1] - 1;

      let next_pos2 = [0, 0];
      next_pos2[0] = position[0] - 1;
      next_pos2[1] = position[1] + 1;

      if (check_position(next_pos1, position)) {
        //let Piece_to_go = BoardArray[next_pos1[0]][next_pos1[1]]
        let next_Piece = BoardArray[next_pos1[0]][next_pos1[1]]

        if (next_Piece.tipey != "none") {
          possible_position.push(next_Piece.mat_id);
        }
      }
      if (check_position(next_pos2, position)) {
        let next_Piece = BoardArray[next_pos2[0]][next_pos2[1]]
        if (next_Piece.tipey != "none") {
          possible_position.push(next_Piece.mat_id);
        }
      }


      if (check_position(next_pos, position)) {
        let next_Piece = BoardArray[next_pos[0]][next_pos[1]]
        if (next_Piece.tipey == "none") {
          possible_position.push(next_Piece.mat_id);



          if (position[0] == 6) {
            let next_Piece = BoardArray[next_pos[0]][next_pos[1]]
            if (next_Piece.tipey = "none") {
              next_pos[0] = position[0] - 2;
              next_pos[1] = position[1];
              let next_Piece = BoardArray[next_pos[0]][next_pos[1]]
              if (next_Piece.tipey == "none" && check_position(next_pos, position)) {
                possible_position.push(next_Piece.mat_id);
              }
            }
          }
        }
      }
    }

    if (Turn === "white") {


      let next_pos = [0, 0];
      next_pos[0] = position[0] + 1;
      next_pos[1] = position[1];

      let next_pos1 = [0, 0];
      next_pos1[0] = position[0] + 1;
      next_pos1[1] = position[1] - 1;

      let next_pos2 = [0, 0];
      next_pos2[0] = position[0] + 1;
      next_pos2[1] = position[1] + 1;

      if (check_position(next_pos1, position)) {
        //let Piece_to_go = BoardArray[next_pos1[0]][next_pos1[1]]
        let next_Piece = BoardArray[next_pos1[0]][next_pos1[1]]
        console.log(next_Piece)
        if (next_Piece.tipey != "none") {
          possible_position.push(next_Piece.mat_id);
        }
      }
      if (check_position(next_pos2, position)) {
        let next_Piece = BoardArray[next_pos2[0]][next_pos2[1]]
        if (next_Piece.tipey != "none") {
          possible_position.push(next_Piece.mat_id);
        }
      }


      if (check_position(next_pos, position)) {
        let next_Piece = BoardArray[next_pos[0]][next_pos[1]]
        if (next_Piece.tipey == "none") {
          possible_position.push(next_Piece.mat_id);



          if (position[0] == 1) {
            let next_Piece = BoardArray[next_pos[0]][next_pos[1]]
            if (next_Piece.tipey = "none") {
              next_pos[0] = position[0] + 2;
              next_pos[1] = position[1];
              let next_Piece = BoardArray[next_pos[0]][next_pos[1]]
              if (next_Piece.tipey == "none" && check_position(next_pos, position)) {
                possible_position.push(next_Piece.mat_id);
              }
            }
          }
        }
      }
    }//

    return possible_position;
  }
  function Where_can_Knight_go(picec) {
    const { id, mat_id, color, tipey, move, possibleMoveTo } = picec;

    let possible_position = [];
    let next_pos = Knight_move(mat_id);

    for (let i = 0; i < 8; i++) {
      if (check_position(next_pos[i], mat_id)) {


        if (next_pos[i][0] < 8 && next_pos[i][0] >= 0 && next_pos[i][1] < 8 && next_pos[i][1] >= 0) possible_position.push(next_pos[i]);
      }
    }
    return possible_position;
  }
  function Where_can_Rook_go(picecs) {
    let position = picecs.mat_id;
    let possible_position = [];
    possible_position.push(Diagonal_move(position, 1, 0));
    possible_position.push(Diagonal_move(position, -1, 0));
    possible_position.push(Diagonal_move(position, 0, -1));
    possible_position.push(Diagonal_move(position, 0, 1));


    return possible_position;
  }
  function Where_can_Queen_go(picecs) {

    let position = picecs.mat_id;
    let possible_position = [];
    possible_position.push(Diagonal_move(position, 1, 1));
    possible_position.push(Diagonal_move(position, -1, 1));
    possible_position.push(Diagonal_move(position, 1, -1));
    possible_position.push(Diagonal_move(position, -1, -1));
    possible_position.push(Diagonal_move(position, -1, 0));
    possible_position.push(Diagonal_move(position, 1, 0));
    possible_position.push(Diagonal_move(position, 0, 1));
    possible_position.push(Diagonal_move(position, 0, -1));

    return possible_position;
  }
  function Where_can_King_go(picec) {

    let position = picec.mat_id;
    let possible_position = [];
    let next_pos = King_move(position)


    const { id, mat_id, color, tipey, move, possibleMoveTo } = picec;
    const [row, colom] = mat_id


    for (let i = 0; i < 8; i++) {
      if (check_position(next_pos[i], position)) {
        let Piece_m = BoardArray[next_pos[i][0]][next_pos[i][1]]
        //let Piece_m = this.get_Piece_from_position(next_pos[i]);

        possible_position.push(Piece_m.mat_id);
      }
    }
    if (!move) {
      if (color == "black") {
        let right_rook = BoardArray[7][7]
        let left_rook = BoardArray[7][0]

        if (right_rook.tipey == "Rook" && !right_rook.move) {
          let picec_7_6 = BoardArray[7][6]
          let picec_7_5 = BoardArray[7][5]
          let picec_7_4 = BoardArray[7][4]

          if (picec_7_4.tipey == "none" && picec_7_5.tipey == "none" && picec_7_6.tipey == "none") {
            if (check_position([7, 4], position) && check_position([7, 5], position) && check_position([7, 6], position)) {
              possible_position.push(picec_7_5.mat_id);

            }

          }
        }
        if (left_rook.tipey == "Rook" && !left_rook.move) {
          let picec_7_2 = BoardArray[7][2]
          let picec_7_1 = BoardArray[7][1]

          if (picec_7_1.tipey == "none" && picec_7_2.tipey == "none") {
            if (check_position([7, 1], position) && check_position([7, 2], position)) {
              possible_position.push(picec_7_1.mat_id);

            }

          }
        }
      }
      if (color == "white") {
        let right_rook = BoardArray[0][7]
        let left_rook = BoardArray[0][0]

        if (right_rook.tipey == "Rook" && !right_rook.move) {
          let picec_7_6 = BoardArray[0][6]
          let picec_7_5 = BoardArray[0][5]
          let picec_7_4 = BoardArray[0][4]

          if (picec_7_4.tipey == "none" && picec_7_5.tipey == "none" && picec_7_6.tipey == "none") {
            if (check_position([0, 4], position) && check_position([0, 5], position) && check_position([0, 6], position)) {
              possible_position.push(picec_7_5.mat_id);

            }
          }
        }
        if (left_rook.tipey == "Rook" && !left_rook.move) {
          let picec_7_2 = BoardArray[0][2]
          let picec_7_1 = BoardArray[0][1]

          if (picec_7_1.tipey == "none" && picec_7_2.tipey == "none") {
            if (check_position([0, 1], position) && check_position([0, 2], position)) {
              possible_position.push(picec_7_1.mat_id);
            }
          }
        }
      }
    }

    return possible_position;
  }
  function Diagonal_move(position, up_down, left_Right) {

    let position_to_go = [0, 0];
    let possible_position = []
    for (let i = 1; i < 8; i++) {
      position_to_go[0] = position[0] + up_down * i;
      position_to_go[1] = position[1] + left_Right * i;

      if (check_position(position_to_go, position)) {
        let Piece = BoardArray[position_to_go[0]][position_to_go[1]]
        // let Piece = this.get_Piece_from_position(position_to_go);

        possible_position.push(Piece.mat_id)

        if (Piece.tipey != "none") {

          return possible_position
        }
      } else {
        if (in_the_bord(position_to_go)) {
          let Piece = BoardArray[position_to_go[0]][position_to_go[1]]

          if (Piece.tipey != "none") {
            return possible_position
          }
        } else {
          return possible_position
        }
      }
    }

    return possible_position
  }
  function check_position(position_to_go, position_from) {
    //var Piece = this.get_Piece_from_position(position);
    //const { id, mat_id, color, tipey, move, possibleMoveTo } = position_from;
    //need to chek it    const { id1, mat_id1, color1, tipey1, move1, possibleMoveTo1 } = position_from;

    if (in_the_bord(position_to_go)) {


      let Piece_to_go = BoardArray[position_to_go[0]][position_to_go[1]]  // this.get_Piece_from_position(position_to_go);
      let Piece_from = BoardArray[position_from[0]][position_from[1]]

      const { id, mat_id, color, tipey, move, possibleMoveTo } = Piece_to_go;

      if (Turn === "black") {
        if (color === "white" || tipey === "none") {

          if (chess(Piece_to_go, Piece_from)) {
            return true;
          }

        }
      } else {
        if (Turn === "white") {
          if (color === "black" || tipey === "none") {

            if (chess(Piece_to_go, Piece_from)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  function get_king(color) {

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (color == BoardArray[i][j].color && BoardArray[i][j].tipey == "King")
          return BoardArray[i][j]

      }
    }
  }
  function chess(Piece_to_go, Piece_from, player = null) {

    let temp_Piece_to_go = {
      id: Piece_to_go.id,
      mat_id: Piece_to_go.mat_id,
      color: Piece_to_go.color,
      tipey: Piece_to_go.tipey,
      move: Piece_to_go.move,
      possibleMoveTo: Piece_to_go.possibleMoveTo
    }

    move_without_Change_turn(Piece_from, Piece_to_go);
    let King = get_king(Turn);
    let kimg_pos = King.mat_id;

    if (Diagonal_chess(kimg_pos, 1, 1, player) &&
      Diagonal_chess(kimg_pos, -1, 1, player) &&
      Diagonal_chess(kimg_pos, 1, -1, player) &&
      Diagonal_chess(kimg_pos, -1, -1, player) &&
      Diagonal_chess(kimg_pos, -1, 0, player) &&
      Diagonal_chess(kimg_pos, 1, 0, player) &&
      Diagonal_chess(kimg_pos, 0, 1, player) &&
      Diagonal_chess(kimg_pos, 0, -1, player) &&
      Knight_chess(kimg_pos, player)
    ) {
      move_without_Change_turn(Piece_to_go, Piece_from);
      add_without_Change_turn(temp_Piece_to_go, temp_Piece_to_go.mat_id);
      return true;
    }

    move_without_Change_turn(Piece_to_go, Piece_from);
    add_without_Change_turn(temp_Piece_to_go, temp_Piece_to_go.mat_id);

    return false;
  }
  function Diagonal_chess(position, up_down, left_Right, turn = null) {


    let position_to_go = [0, 0];

    for (let i = 1; i < 8; i++) {
      position_to_go[0] = position[0] + up_down * i;
      position_to_go[1] = position[1] + left_Right * i;
      if (in_the_bord(position_to_go)) {
        if (Turn == "white") {
          let Piece = BoardArray[position_to_go[0]][position_to_go[1]]
          //let Piece = this.get_Piece_from_position(position_to_go);
          //console.log(Piece)
          if (Piece.tipey != "none") {
            if (Piece.color == "black") {

              if (Piece.tipey == "Pawn" && up_down == 1 && (left_Right == 1 || left_Right == -1) && i == 1) {
                return false
              }
              if (Piece.tipey == "Rook" && (((up_down == 1 || up_down == -1) && left_Right == 0) || (up_down == 0 && (left_Right == -1 || left_Right == 1)))) {
                return false
              }
              if (Piece.tipey == "Bishop" && ((up_down == 1 || up_down == -1) && (left_Right == -1 || left_Right == 1))) {
                return false
              }
              if (Piece.tipey == "Queen") {
                return false
              }
              if (Piece.tipey == "King" && i == 1) {
                return false
              }
              return true
            }
            return true
          }

        }
        if (Turn == "black") {
          let Piece = BoardArray[position_to_go[0]][position_to_go[1]]
          //let Piece = this.get_Piece_from_position(position_to_go);

          if (Piece.tipey != "none") {
            if (Piece.color == "white") {

              if (Piece.tipey == "Pawn" && up_down == -1 && (left_Right == 1 || left_Right == -1) && i == 1) {
                return false
              }
              if (Piece.tipey == "Rook" && (((up_down == 1 || up_down == -1) && left_Right == 0) || (up_down == 0 && (left_Right == -1 || left_Right == 1)))) {
                return false
              }
              if (Piece.tipey == "Bishop" && ((up_down == 1 || up_down == -1) && (left_Right == -1 || left_Right == 1))) {
                return false
              }
              if (Piece.tipey == "Queen") {

                return false
              }
              if (Piece.tipey == "King" && i == 1) {
                return false
              }
              return true
            }
            return true
          }
        }
      }

    }
    return true
  }
  function Knight_chess(position, turn = null) {

    // if (turn == null) {
    //   turn = this.Ob_game.turn;
    // }

    let pos = Knight_move(position);

    for (let i = 0; i < 8; i++) {
      if (in_the_bord(pos[i])) {
        if (Turn == "black") {
          let Piece = BoardArray[pos[i][0]][pos[i][1]]
          //let Piece = this.get_Piece_from_position(pos[i]);
          if (!Piece.tipey == "none" && Piece.tipey == "Knight") {
            if (Piece.color == "white") {
              return false;
            }
          }
        }
        if (Turn == "white") {
          let Piece = BoardArray[pos[i][0]][pos[i][1]]

          if (!Piece.tipey == "none" && Piece.tipey == "Knight") {
            if (Piece.color == "black") {
              return false;
            }
          }
        }
      }
    }
    return true;

  }
  function add_without_Change_turn(pice, position) {

    const [row, colom] = position
    const { id, mat_id, color, tipey, move, possibleMoveTo } = pice
    BoardArray[row][colom].color = color;
    BoardArray[row][colom].tipey = tipey;
    BoardArray[row][colom].move = move;
  }
  function move_without_Change_turn(Piece_from, Piece_to) {

    const { id, mat_id, color, tipey, move, possibleMoveTo } = Piece_to;
    const [row, colom] = mat_id

    const { id: piceToMoveid, mat_id: piceToMovemat_id, color: piceToMovecolor, tipey: piceToMovetipey, move: piceToMovemove } = Piece_from
    const [piceToMoverow, piceToMovecolom] = piceToMovemat_id

    BoardArray[piceToMoverow][piceToMovecolom].color = "none";
    BoardArray[piceToMoverow][piceToMovecolom].tipey = "none";
    BoardArray[piceToMoverow][piceToMovecolom].move = false;

    BoardArray[row][colom].color = piceToMovecolor;
    BoardArray[row][colom].tipey = piceToMovetipey;
    BoardArray[row][colom].move = true;

    //setBoard(BoardArray)

    // this.remove_Piece_from_Player(Piece_to);
    // this.remove_Piece_from_Player(Piece_from);
    // this.board.move_be_position(Piece_from, Piece_to);
    // this.add_Piece_to_Player(Piece_to);
  }
  function Knight_move(position) {

    let next_pos1 = [0, 0];
    next_pos1[0] = Number(position[0]) - 2;
    next_pos1[1] = Number(position[1]) - 1;

    let next_pos2 = [0, 0];
    next_pos2[0] = Number(position[0]) + 2;
    next_pos2[1] = Number(position[1]) - 1;

    let next_pos3 = [0, 0];
    next_pos3[0] = Number(position[0]) + 2;
    next_pos3[1] = Number(position[1]) + 1;

    let next_pos4 = [0, 0];
    next_pos4[0] = Number(position[0]) - 2;
    next_pos4[1] = Number(position[1]) + 1;

    let next_pos5 = [0, 0];
    next_pos5[0] = Number(position[0]) - 1;
    next_pos5[1] = Number(position[1]) - 2;

    let next_pos6 = [0, 0];
    next_pos6[0] = Number(position[0]) + 1;
    next_pos6[1] = Number(position[1]) - 2;

    let next_pos7 = [0, 0];
    next_pos7[0] = Number(position[0]) + 1;
    next_pos7[1] = Number(position[1]) + 2;

    let next_pos8 = [0, 0];
    next_pos8[0] = Number(position[0]) - 1;
    next_pos8[1] = Number(position[1]) + 2;

    let next_pos = [next_pos1, next_pos2, next_pos3, next_pos4, next_pos5, next_pos6, next_pos7, next_pos8]
    return next_pos
  }
  function retutnMvoe() {
    let moveBeak = gameMoves.pop()
    setPice(moveBeak[0])
    setPice(moveBeak[1])
    let copy = [...BoardArray]
    setBoard(copy);
    chingeTurn()
    cleer_all()
  }
  function setPice(Piece) {
    const { mat_id } = Piece;
    const [row, colom] = mat_id
    BoardArray[row][colom] = Piece
    setBoard(BoardArray);
  }
  function checkChessMate(player = null) {
    let King = get_king(Turn);
    let kimg_pos = King.mat_id;

    if (Diagonal_chess(kimg_pos, 1, 1, player) &&
      Diagonal_chess(kimg_pos, -1, 1, player) &&
      Diagonal_chess(kimg_pos, 1, -1, player) &&
      Diagonal_chess(kimg_pos, -1, -1, player) &&
      Diagonal_chess(kimg_pos, -1, 0, player) &&
      Diagonal_chess(kimg_pos, 1, 0, player) &&
      Diagonal_chess(kimg_pos, 0, 1, player) &&
      Diagonal_chess(kimg_pos, 0, -1, player) &&
      Knight_chess(kimg_pos, player)
    ) {
      setChessState(false)
      return
    }

    setChessState(true)

  }
  function copyPice(Piece) {
    let PieceRet = {
      id: Piece.id,
      mat_id: Piece.mat_id,
      color: Piece.color,
      tipey: Piece.tipey,
      move: Piece.move,
      possibleMoveTo: Piece.possibleMoveTo
    }
    return PieceRet
  }
  function movePice(PieceFrom, PieceTo) {

    const { id, mat_id, color, tipey, move, possibleMoveTo } = PieceTo;
    const [row, colom] = mat_id

    const { id: piceToMoveid, mat_id: piceToMovemat_id, color: piceToMovecolor, tipey: piceToMovetipey, move: piceToMovemove } = PieceFrom
    const [piceToMoverow, piceToMovecolom] = piceToMovemat_id

    BoardArray[piceToMoverow][piceToMovecolom].color = "none";
    BoardArray[piceToMoverow][piceToMovecolom].tipey = "none";
    BoardArray[piceToMoverow][piceToMovecolom].move = false;

    BoardArray[row][colom].color = piceToMovecolor;
    BoardArray[row][colom].tipey = piceToMovetipey;
    BoardArray[row][colom].move = true;
  }
  function checkCoronation(PieceFrom, PieceTo) {

    const { id, mat_id, color, tipey, move, possibleMoveTo } = PieceTo;
    const [row, colom] = mat_id
    const { id: piceToMoveid, mat_id: piceToMovemat_id, color: piceToMovecolor, tipey: piceToMovetipey, move: piceToMovemove } = PieceFrom
    const [piceToMoverow, piceToMovecolom] = piceToMovemat_id

    if (piceToMovetipey == "Pawn" && ((row == 7 && piceToMovecolor == "white") || (row == 0 && piceToMovecolor == "black"))) {
      return true
    }
    return false
  }
  function handleBoardClick(e, clikBox) {

    const { mat_id, color, possibleMoveTo } = clikBox;
    const [row, colom] = mat_id


    if (possibleMoveTo) {
      const { mat_id: piceToMovemat_id, tipey: piceToMovetipey } = piceToMove
      const [piceToMoverow, piceToMovecolom] = piceToMovemat_id

      //checkCoronation(BoardArray[piceToMoverow][piceToMovecolom], BoardArray[row][colom]);
      // if (checkCoronation(BoardArray[piceToMoverow][piceToMovecolom], BoardArray[row][colom])) {
      //   console.log("im the queen")
      //   BoardArray[piceToMoverow][piceToMovecolom].tipey = "Queen"
      // }

      gameMoves.push([copyPice(BoardArray[piceToMoverow][piceToMovecolom]), copyPice(BoardArray[row][colom])]);
      //checkCoronation(BoardArray[piceToMoverow][piceToMovecolom], BoardArray[row][colom]);
      if (checkCoronation(BoardArray[piceToMoverow][piceToMovecolom], BoardArray[row][colom])) {

        BoardArray[piceToMoverow][piceToMovecolom].tipey = "Queen"
      }
      setgameMoves(gameMoves);
      movePice(piceToMove, clikBox);
      setBoard(BoardArray);
      chingeTurn();
      checkChessMate();
      cleer_all();
      return
    }

    if (color === Turn) {
      cleer_all()
      setpiceToMove(clikBox)
      let ArraypossibleMoves = ArraypossibleMove(clikBox)
      ArraypossibleMoves.forEach(box => {
        const [row, colom] = box
        BoardArray[row][colom].possibleMoveTo = true
      });
      setBoard(BoardArray)
    }

    let copy = [...BoardArray]
    setBoard(copy);
  }

  function cleer_all() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        BoardArray[i][j].possibleMoveTo = false

      }
    }
  }


  return (
    <div>
      <Board board={BoardArray} handleBoardClick={handleBoardClick}>{BoardArray}

      </Board>
      <button onClick={chingeTurn}>chingeTurn</button>
      <button onClick={retutnMvoe}>retutn te lest mvoe</button>
      {chessState ? shwoChess() : <h1>state :</h1>}
    </div>
  )

}

function in_the_bord(position) {
  if (position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7) {
    return false;
  }
  return true;
}
function King_move(position) {

  let next_pos1 = [0, 0];
  next_pos1[0] = position[0] - 1;
  next_pos1[1] = position[1] - 1;

  let next_pos2 = [0, 0];
  next_pos2[0] = position[0] + 1;
  next_pos2[1] = position[1] - 1;

  let next_pos3 = [0, 0];
  next_pos3[0] = position[0] - 1;
  next_pos3[1] = position[1] + 1;

  let next_pos4 = [0, 0];
  next_pos4[0] = position[0] + 1;
  next_pos4[1] = position[1] + 1;

  let next_pos5 = [0, 0];
  next_pos5[0] = position[0] - 0;
  next_pos5[1] = position[1] + 1;

  let next_pos6 = [0, 0];
  next_pos6[0] = position[0] - 0;
  next_pos6[1] = position[1] - 1;

  let next_pos7 = [0, 0];
  next_pos7[0] = position[0] - 1;
  next_pos7[1] = position[1] + 0;

  let next_pos8 = [0, 0];
  next_pos8[0] = position[0] + 1;
  next_pos8[1] = position[1] + 0;

  return [next_pos1, next_pos2, next_pos3, next_pos4, next_pos5, next_pos6, next_pos7, next_pos8]
}
function shwoChess() {
  return (
    <h1>Chess</h1>
  )
}

export default Game
