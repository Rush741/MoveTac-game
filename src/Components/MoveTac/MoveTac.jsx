import React from 'react';
import "./MoveTac.css";

const MoveTac = () => {
  return (
    <div>
        <div className="container">
            <h1 className="title">Move Tac</h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes"></div>
                    <div className="boxes"></div>
                    <div className="boxes"></div>
                </div>
                <div className="row2">
                    <div className="boxes"></div>
                    <div className="boxes"></div>
                    <div className="boxes"></div>
                </div>
                <div className="row3">
                    <div className="boxes"></div>
                    <div className="boxes"></div>
                    <div className="boxes"></div>
                </div>
            </div>
            <button className="reset">Reset</button>
        </div>
    </div>
  )
}

export default MoveTac;