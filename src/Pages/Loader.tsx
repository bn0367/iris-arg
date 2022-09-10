import React, {useEffect} from "react";
import "../CSS/OS.scss";

let idx = 0;
let base = '...';
let repl = '·'

function Loader() {
    const [text, setText] = React.useState("...");
    useEffect(() => {
        setInterval(() => {
            setText(() => base.substring(idx + 1) + repl + base.substring(0, idx));
            idx++;
            idx %= base.length;
        }, 150);
    }, []);
    return (
        <p className={'title unselectable'}>{text}</p>
    );
}

export default Loader;