import React from "react";

export default function Disclaimer() {
    return (
        <div className="window fill" style={{overflowY: 'hidden'}}>
            <h1>Disclaimer</h1>
            <p style={{whiteSpace: 'pre-line'}}>
                Any company names referred to on this website are not affiliated with or endorsed by the real companies,
                should one by that name exist in the real world. Any resemblance to real persons, living or dead, is
                purely coincidental.<br/><br/>
                All names on this website have been randomly generated, and are not intended to be real.
                <br/><br/>
                For comments, concerns, or more (accessibility questions, want a randomly changed name changed, etc.)
                contact <a href="mailto:bnewman@oberlin.edu">bnewman@oberlin.edu</a>
            </p>
        </div>
    );
}