import React from "react";

import "../CSS/404.scss";
import "../CSS/glitch.scss"; // glitch effect from https://codepen.io/mattgrosswork/pen/VwprebG

// generic 404 page, but this one has cool glitch effects

function FourZeroFour() {
    return (
        <div>
            <h2 style={{color: "#1e4474"}} className={"text glitch layers"} data-text={"404"}>404</h2>
        </div>
    )
}

export default FourZeroFour;