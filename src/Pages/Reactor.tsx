import React from "react";
import toast, {Toaster} from "react-hot-toast";
import {useCookies} from "react-cookie";
import {cOptions} from "../typescript/consts";


function Reactor() {
    const [code, setCode] = React.useState("");
    const [, setCookie,] = useCookies();
    return (
        <>
            <div className={'fbutton corner'} onClick={() => window.location.href = '/os'}>BACK</div>
            <div className="window fill">
                <div>
                    <div className="title">Reactor Controls</div>
                </div>
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
                <div className={'centered controls'}>
                    <div>
                        <label>Power Output</label>
                        <br/>
                        <input type={'range'} className={'slider disabled'} min={0} max={100} value={1}/>
                    </div>
                    <div>
                        <label>Temperature</label>
                        <br/>
                        <input type={'range'} className={'slider disabled'} min={0} max={100} value={75}/>
                    </div>
                    <div>
                        <label>Pressure</label>
                        <br/>
                        <input type={'range'} className={'slider disabled'} min={-100} max={100} value={0}/>
                    </div>
                    <div>
                        <label>Water Level</label>
                        <br/>
                        <input type={'range'} className={'slider disabled'} min={0} max={100} value={5}/>
                    </div>
                    <div>
                        <label>Fuel Level</label>
                        <br/>
                        <input type={'range'} className={'slider disabled'} min={0} max={100} value={5}/>
                    </div>
                    <div>
                        <label>Reactor Damage</label>
                        <br/>
                        <input type={'range'} className={'slider disabled'} min={0} max={100} value={90}/>
                    </div>
                </div>
                <div className={'window hidden'} id={'shutdownmodal'}>
                    <h2 className={'centered'}>
                        EMERGENCY SHUTDOWN CODE REQUIRED
                    </h2>
                    <input type={'number'} className={'window search emergencyinput'} autoFocus={true}
                           placeholder={'CODE'} onInput={(e) => {
                        setCode(e.currentTarget.value);
                    }}/>
                    <div className={'fbutton'} style={{fontSize: '1.5em'}} onClick={() => {
                        if (code === '952376') {
                            // @ts-ignore
                            document.body?.classList.add('blipout');
                            setCookie('finished', '', cOptions);
                            window.location.reload();
                        } else {
                            toast.error('Invalid code');
                        }
                    }}>SUBMIT CODE
                    </div>
                    <div className={'fbutton corner'} onClick={() => {
                        document.getElementsByClassName('modal')[0].classList.add('hidden');
                        document.getElementsByClassName('modal')[0].classList.remove('animwindow');
                        document.getElementsByClassName('modal')[0].classList.remove('modal');
                    }}>X
                    </div>
                </div>
            </div>
            <Toaster/>
        </>
    )
}

export default Reactor;

