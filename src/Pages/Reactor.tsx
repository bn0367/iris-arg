import React from "react";

function Reactor() {
    return (
        <>
            <div className={'fbutton corner'} onClick={() => window.location.href = '/os'}>BACK</div>
            <div className="window fill">
                <div className="titlebar">
                    <div className="title">Reactor Controls</div>
                </div>
                <div>
                    <div className={'window pulse fbutton centered'}>
                        SHUTDOWN
                    </div>
                    <input type={'range'} className={'slider'} min={0} max={100}/>
                </div>
            </div>
        </>
    )
}

export default Reactor;

