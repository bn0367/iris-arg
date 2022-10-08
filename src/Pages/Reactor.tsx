import React from "react";

function Reactor() {
    return (
        <>
            <div className={'fbutton corner'} onClick={() => window.location.href = '/os'}>BACK</div>
            <div className="window fill">
                <div>
                    <div className="title">Reactor Controls</div>
                </div>
                <div>
                    <div className={'window pulse fbutton centered shutdown'} onClick={() => {
                        document.getElementById('shutdownmodal')?.classList.remove('hidden');
                        document.getElementById('shutdownmodal')?.classList.add('modal');
                        document.getElementById('shutdownmodal')?.classList.add('animwindow');
                        setTimeout(() => {
                            document.getElementById('shutdownmodal')?.classList.remove('animwindow');
                        }, 1000);
                    }}>
                        SHUTDOWN
                    </div>
                    <input type={'range'} className={'slider'} min={0} max={100}/>
                </div>
                <div className={'window hidden'} id={'shutdownmodal'}>
                    <h2 className={'centered'}>
                        EMERGENCY SHUTDOWN CODE REQUIRED
                    </h2>
                    <input type={'text'} className={'centered'}/>
                    <div className={'fbutton corner'} onClick={() => {
                        document.getElementsByClassName('modal')[0].classList.add('hidden');
                        document.getElementsByClassName('modal')[0].classList.remove('animwindow');
                        document.getElementsByClassName('modal')[0].classList.remove('modal');
                    }}>X
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reactor;

