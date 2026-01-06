import {useState, useRef} from 'react';
import "./MoveTac.css";
import cross_icon from "../Assets/cross.png";
import circle_icon from "../Assets/circle.png";

let boxes = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

const MoveTac = () => {

    let [curr, setCurr] = useState(0);
    let [movePhase, setMovePhase] = useState(false);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);

    const playMove = (e, r, c) => {

        if(lock || movePhase) {
            return 0;
            //nothing for now
        } else {
            if(boxes[r][c]!=="") return 0;

            if(curr%2 === 0) {
                boxes[r][c] = "x";
                e.target.innerHTML = `<img src="${cross_icon}" />`;
            }
            else {
                boxes[r][c] = "o";
                e.target.innerHTML = `<img src="${circle_icon}" />`;
            }

        }
        setCurr(++curr);

        checkWin();
    }

    const checkWin = () => {
    // Rows
        if (boxes[0][0] === boxes[0][1] && boxes[0][1] === boxes[0][2] && boxes[0][2] !== "") {
            pauseGame(boxes[0][2]);
        }
        else if (boxes[1][0] === boxes[1][1] && boxes[1][1] === boxes[1][2] && boxes[1][2] !== "") {
            pauseGame(boxes[1][2]);
        }
        else if (boxes[2][0] === boxes[2][1] && boxes[2][1] === boxes[2][2] && boxes[2][2] !== "") {
            pauseGame(boxes[2][2]);
        }

        // Columns
        else if (boxes[0][0] === boxes[1][0] && boxes[1][0] === boxes[2][0] && boxes[2][0] !== "") {
            pauseGame(boxes[2][0]);
        }
        else if (boxes[0][1] === boxes[1][1] && boxes[1][1] === boxes[2][1] && boxes[2][1] !== "") {
            pauseGame(boxes[2][1]);
        }
        else if (boxes[0][2] === boxes[1][2] && boxes[1][2] === boxes[2][2] && boxes[2][2] !== "") {
            pauseGame(boxes[2][2]);
        }

        // Diagonals
        else if (boxes[0][0] === boxes[1][1] && boxes[1][1] === boxes[2][2] && boxes[2][2] !== "") {
            pauseGame(boxes[2][2]);
        }
        else if (boxes[0][2] === boxes[1][1] && boxes[1][1] === boxes[2][0] && boxes[2][0] !== "") {
            pauseGame(boxes[2][0]);
        }
    }


    const pauseGame = (ch) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: Player <img src="${ch==="x"? cross_icon: circle_icon}" /> wins!`;
    }

    const reset = () => {
        setLock(false);
        boxes = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        const allBoxes = document.querySelectorAll(".boxes");
        allBoxes.forEach((box) => {
            box.innerHTML = "";
        });
        titleRef.current.innerHTML = "Move Tac";
        setCurr(0);
    }

  return (
    <div>
        <div className="container">
            <h1 className="title" ref={titleRef}>Move Tac</h1>
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
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    </div>
  )
}

export default MoveTac;