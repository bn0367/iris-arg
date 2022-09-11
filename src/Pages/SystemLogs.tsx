import React from "react";
import "../CSS/OS.scss";
import '../CSS/glitch.scss';
import {logs} from "../typescript/consts";

function SystemLogs() {
    return (
        <>
            <div className={'fbutton corner'} onClick={() => window.location.href = '/os'}>BACK</div>
            <div className="window fill" style={{padding: 0}}>
                <p className="title message">SYSTEM LOGS</p>
                <hr className="line"/>
                <table className={'messages'}>
                    <tbody>
                    {logs.map((log, index) => {
                        return (
                            <tr className={'log'} key={index}><p className={'message'}>{log}</p></tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SystemLogs;