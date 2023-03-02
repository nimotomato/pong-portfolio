import './Board.css';
import { useEffect, useRef } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';


const Board = () => {
    const divStyle = {
        width: "50em",
        height: "30em",
        borderStyle: "solid",
        borderColor: "purple"
    }
    
    const bounds = useRef();

    const setBounds = () => {
        const board = document.querySelector('.board-container');
        const boardDimensions = board.getBoundingClientRect();
        bounds.current = boardDimensions;
    }

    useEffect(() => {setBounds()}, [])

    // TO DO: Get bounds from paddles and make the ball change direction when touching it


    return (
        <div 
            className="board-container"
            style={divStyle}>
            <Paddle dir={"left"} key="left"/>
            <Paddle dir={"right"} key="right"/>
            <Ball bounds={bounds}/>
        </div>
      );
}
 
export default Board;