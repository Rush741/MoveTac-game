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
    let [gamePhase, setGamePhase] = useState("Placement"); //or "Movement"
    let [lock, setLock] = useState(false);
    let [selected, setSelected] = useState(null);
    let titleRef = useRef(null);

    const playMove = (e, r, c) => {

        if(lock) return 0;
        
        if(gamePhase === "Placement") { // PLACEMENT PHASE  
        
            if(boxes[r][c]!=="") return 0;

            if(curr%2 === 0) {
                boxes[r][c] = "x";
            }
            else {
                boxes[r][c] = "o";
            }
                
            setCurr(++curr);
            
        } else if(gamePhase === "Movement") { // MOVEMENT PHASE
            
            let currPlayer = (curr%2 === 0)? "x" : "o";
            
            if(boxes[r][c] === currPlayer) { //currMove box
                
                setSelected({r, c});
                return;
                
            }

            if(boxes[r][c] === "" && selected) { //empty box
                
                if(isValidMove(r,c)) {

                    boxes[r][c] = boxes[selected.r][selected.c];
                    boxes[selected.r][selected.c] = "";
                    setSelected(null);
                    checkWin();
                    setCurr(++curr);

                } 
                else return;


            } else { //opponent box

                setSelected(null);
                return;

            }


        } else { //ERROR
            console.log("wrong gamePhaseError");
        }


        if(curr === 6) setGamePhase("Movement"); 

        checkWin();
    }

    const isValidMove = (r, c) => {
        if(!selected || boxes[r][c]!=="") return false;
        let rDiff = Math.abs(r - selected.r);
        let cDiff = Math.abs(c - selected.c);

        return rDiff + cDiff === 1;
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
        titleRef.current.innerHTML = "Move Tac";
        setCurr(0);
        setSelected(null);
        setGamePhase("Placement");
    }

  return (
    <div>
        <div className="container">
            <h1 className="title" ref={titleRef}>Move Tac</h1>
            <div className="board">
                <div className="row1">
                    <div className={`boxes 
                        ${(selected?.r === 0 && selected?.c === 0) && "glow"} 
                        ${isValidMove(0,0) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 0, 0)}>
                            {(boxes[0][0] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[0][0] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>

                    <div className={`boxes 
                        ${(selected?.r === 0 && selected?.c === 1) && "glow"} 
                        ${isValidMove(0,1) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 0, 1)}>
                            {(boxes[0][1] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[0][1] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>

                    <div className={`boxes 
                        ${(selected?.r === 0 && selected?.c === 2) && "glow"} 
                        ${isValidMove(0,2) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 0, 2)}>
                            {(boxes[0][2] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[0][2] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>
                </div>

                <div className="row2">
                    <div className={`boxes 
                        ${(selected?.r === 1 && selected?.c === 0) && "glow"} 
                        ${isValidMove(1,0) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 1, 0)}>
                            {(boxes[1][0] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[1][0] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>

                    <div className={`boxes 
                        ${(selected?.r === 1 && selected?.c === 1) && "glow"} 
                        ${isValidMove(1,1) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 1, 1)}>
                            {(boxes[1][1] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[1][1] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>

                    <div className={`boxes 
                        ${(selected?.r === 1 && selected?.c === 2) && "glow"} 
                        ${isValidMove(1,2) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 1, 2)}>
                            {(boxes[1][2] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[1][2] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>
                </div>

                <div className="row3">
                    <div className={`boxes 
                        ${(selected?.r === 2 && selected?.c === 0) && "glow"} 
                        ${isValidMove(2,0) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 2, 0)}>
                            {(boxes[2][0] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[2][0] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>

                    <div className={`boxes 
                        ${(selected?.r === 2 && selected?.c === 1) && "glow"} 
                        ${isValidMove(2,1) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 2, 1)}>
                            {(boxes[2][1] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[2][1] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>

                    <div className={`boxes 
                        ${(selected?.r === 2 && selected?.c === 2) && "glow"} 
                        ${isValidMove(2,2) && "valid-move"}`} 
                        onClick={(e) => playMove(e, 2, 2)}>
                            {(boxes[2][2] === "x") && <img src={cross_icon} alt="X"/>}
                            {(boxes[2][2] === "o") && <img src={circle_icon} alt="O"/>}
                    </div>
                </div>

            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    </div>
  )
}

export default MoveTac;