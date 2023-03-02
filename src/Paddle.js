import './Paddle.css';
import { useState, useRef } from 'react';

const Paddle = ( props ) => {
    const isDownRef = useRef(false);
    const [yPosition, setYPosition] = useState(200);
    const [startPosition, setStartPosition] = useState();

    const handleMouseDown=(event)=> {
        isDownRef.current = true;
        setStartPosition(event.clientY - yPosition)
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    
    const handleMouseMove=(event)=> {
        if (isDownRef.current){
            setYPosition(event.clientY - startPosition)
        }   
    }
    
    const handleMouseUp=(event)=> {
        isDownRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    return (
        <div 
            className={`paddle-${props.dir}`}
            style={{
                width: "0.5em",
                height: "4em",
                borderStyle: "solid",
                borderColor: "purple",
                backgroundColor: "purple",
                top: yPosition
            }}
            onMouseDown={handleMouseDown}
            >
                
        </div>
      );
}
 
export default Paddle;