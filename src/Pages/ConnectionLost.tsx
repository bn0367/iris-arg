import React from "react";

import "../CSS/404.scss";
import "../CSS/glitch.scss"; // glitch effect from https://codepen.io/mattgrosswork/pen/VwprebG

// generic 404 page, but this one has cool glitch effects

function FourZeroFour() {
    return (
        <div>
            <h2 className={"text glitch layers"} data-text={"Connection Lost."}>Connection Lost.</h2>
        </div>
    )
}

export default FourZeroFour;