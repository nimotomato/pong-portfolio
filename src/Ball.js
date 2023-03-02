import { useState } from "react";

const xStart = (Math.random() * 2 - 1).toFixed(2);
const yStart = (Math.random() * 2 - 1).toFixed(2);
const initialX = 380;
const initialY = 230;

const Ball = ( props ) => {
    const [position, setPosition] = useState({
        x: initialX,
        y: initialY
    })

    const [velocity, setVelocity] = useState(1)

    const [direction, setDirection] = useState({
        x: xStart,
        y: yStart
    })

    // Controls fps of ball
    const frameDuration = 1;

    // TO DO: Fix the magic numbers in the bounds lol
    const handleNewPosition = () => {
        const newPosX = position.x + (velocity * direction.x);
        const newPosY = position.y + (velocity * direction.y);
        // Checks horizontal bounds (TO BE REMOVED this should give score)
        if (newPosX >= props.bounds.current.right - (initialX/2) - 25 || newPosX <= props.bounds.current.left - (initialX/2)){
            setDirection({
                x: (direction.x * -1),
                y: direction.y
                })
        }
        // Checks vertical bounds
        if (newPosY >= props.bounds.current.bottom - (initialY - 30) || newPosY <= props.bounds.current.top - (initialY - 40)){
            setDirection({
                x: direction.x,
                y: (direction.y * -1)
                })
        }

        setPosition({
            x: position.x + (velocity * direction.x),
            y: position.y + (velocity * direction.y)
            })
    }

    
    setTimeout(handleNewPosition, frameDuration)

    

    return (
    <div 
        className="ball"
        style={{
            width: "1em",
            height: "1em",
            backgroundColor: "green",
            borderRadius: "1em",
            position: "absolute",
            top: position.y,
            left: position.x
        }}
        >
                
    </div> 
        );
}
 
export default Ball;