import React from 'react'
import Confetti from 'react-confetti/dist/types/Confetti';
const [active, setActive] = useState(true);

const handleClick = () => {
    setActive(false);
    setTimeout(() => setActive(false), 2000)
}
const Confetti = () => {
    setActive
    return (
        <div>
           {active && <Confetti/>}
        </div>
    )
}

export default Confetti
