import {React, useState} from 'react';
import "./MoveTac.css";
import cross_icon from "../Assets/cross.png";
import circle_icon from "../Assets/circle.png";

const boxes = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

const MoveTac = () => {

    let [curr, setCurr] = useState(0);
    let [movePhase, setMovePhase] = useState(false);

    const playMove = (e, r, c) => {

        if(movePhase) {
            //nothing for now
        } else {
            if(boxes[r][c]!=="") return 0;

            if(curr%2 == 0) {
                boxes[r][c] = "x";
                e.target.innerHTML = `<img src="${cross_icon}" />`;
            }
            else {
                boxes[r][c] = "o";
                e.target.innerHTML = `<img src="${circle_icon}" />`;
            }

        }
        setCurr(++curr);
    }

  return (
    <div>
        <div className="container">
            <h1 className="title">Move Tac</h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => {playMove(e, 0, 0)}}></div>
                    <div className="boxes" onClick={(e) => {playMove(e, 0, 1)}}></div>
                    <div className="boxes" onClick={(e) => {playMove(e, 0, 2)}}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => {playMove(e, 1, 0)}}></div>
                    <div className="boxes" onClick={(e) => {playMove(e, 1, 1)}}></div>
                    <div className="boxes" onClick={(e) => {playMove(e, 1, 2)}}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => {playMove(e, 2, 0)}}></div>
                    <div className="boxes" onClick={(e) => {playMove(e, 2, 1)}}></div>
                    <div className="boxes" onClick={(e) => {playMove(e, 2, 2)}}></div>
                </div>
            </div>
            <button className="reset">Reset</button>
        </div>
    </div>
  )
}

export default MoveTac;