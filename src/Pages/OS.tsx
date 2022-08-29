import React, {useEffect, useState} from 'react';

import "../CSS/glitch.scss";
import "../CSS/OS.scss";
import Window from "../components/window";

// this will be the "main hub": where all of the puzzles are stored, as well as the completion state
// TODO: add puzzles
// TODO: create "ui" (probably text based, want it to look like a terminal)

let time = 7200;


function OS() {
    const [timer, setTimer] = useState(time);

    useEffect(() => {
        const interval = setInterval(() => setTimer(c => c - 1), 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <Window width={15} height={5} key={timer}>
            <p className={'timer glitch layers'}>{timer}</p>
        </Window>
    )
}

export default OS;