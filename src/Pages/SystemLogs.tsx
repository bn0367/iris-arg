import React from "react";
import "../CSS/OS.scss";
import '../CSS/hoverglitch.scss'
import {logs} from "../typescript/consts";

function SystemLogs() {
    return (
        <>
            <div className={'fbutton corner'} onClick={() => window.location.href = '/os'}>BACK</div>
            <div className="window fill" style={{padding: 0}}>
                <table className={'messages'}>
                    <tbody>
                    {logs.map((log, index) => {
                        let c = log.includes('SUSPICIOUS') ? ' hoverglitch' : '';
                        return (
                            <tr key={index} className={'log'}>
                                <td className={"message" + c} data-text={log}>{c === '' ? log : ''}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SystemLogs;