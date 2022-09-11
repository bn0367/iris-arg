import React, {useEffect, useState} from 'react';

import "../CSS/glitch.scss";
import "../CSS/OS.scss";
import {useCookies} from "react-cookie";
import toast, {Toaster} from "react-hot-toast";
import {hashes} from "../typescript/consts";
import {apiUrl} from "../index";

let chatMessage = "";

function OS() {
    const [ct, setChatText] = useState("");
    const [cookies, setCookie,] = useCookies();
    const [cursorOffset, setCursorOffset] = useState(0);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let interval = setInterval(async () => {
            const res = await fetch(apiUrl + "/api/chat/poll", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
            const data = await res.json();
            if (data.length > 0) {
                setMessages(data);
            }
        }, 1000);
        return () => clearInterval(interval);
    });
    return (
        <>
            <div className={'chatarea'}>
                <div className={'chat window'}>
                    <p className={'title message'}>CHAT</p>
                    <div className={'messages'}>
                        {Array.apply(null, Array(10 - messages.length)).map((_, i) => {
                            return <div className={'message'} key={10 - i}>&nbsp;</div>
                        })}
                        {messages.map((message, index) => {
                            return <div key={index}
                                        className={'message'}>[{new Date(message['time']).toLocaleTimeString("en-US", {
                                timeStyle: 'medium',
                                hour12: false
                            })}] &lt;{message['user']}&gt;: {message['message']}</div>
                        })}
                    </div>
                    <hr className={'line'}/>
                    <p className={'message'}>&gt; {ct}<span className="cursor"
                                                            style={{marginLeft: `${cursorOffset * 9}px`}}>█</span>
                    </p>
                    <input autoFocus spellCheck={'false'} className={'hidden unselectable'}
                           onBlur={({target}) => target.focus()} type={'text'}
                           onInput={(e) => {
                               chatMessage = (e.target as HTMLInputElement).value;
                               setChatText(chatMessage as string);
                           }}
                           onSelect={(e) => {
                               let element = e.target as HTMLInputElement;
                               element.selectionStart = element.selectionEnd;
                               setCursorOffset((element.selectionStart as number) - element.value.length);
                           }}
                           onKeyUp={(e) => {
                               let element = e.target as HTMLInputElement;
                               if (e.key === "Enter") {
                                   if (chatMessage.length > 0) {
                                       fetch(apiUrl + '/api/chat/send', {
                                           method: 'POST',
                                           headers: {
                                               accept: 'application/json',
                                               'Content-Type': 'application/json',

                                           },
                                           body: JSON.stringify({
                                               message: chatMessage,
                                               token: cookies.token,
                                           })
                                       }).then(res => res.json()).then(res => {
                                           if ('message' in res && res.message === 'success') {
                                               chatMessage = "";
                                               (e.target as HTMLInputElement).value = "";
                                               setChatText("");
                                               setCursorOffset(0);
                                           } else {
                                               toast.error(res.message);
                                           }
                                       });
                                   }
                               } else if (e.key === "Backspace" || e.key === "Delete") {
                                   setCursorOffset((element.selectionStart as number) - element.value.length);
                               }
                           }}
                    />
                    <Toaster/>
                </div>
            </div>
            <div className={'otherarea flexd'}>
                <div className={'window'}>
                    <p className={'title message'}>EMPLOYEE DIRECTORY</p>
                    <hr className={'line'}/>
                    <div className={'fbutton'} onClick={
                        () => {
                            setCookie(hashes['os-employees'], true);
                            window.location.href = '/os-employees';
                        }}>BROWSE
                    </div>
                </div>
                <div className={'window'}>
                    <p className={'title message'}>SYSTEM LOGS</p>
                    <hr className={'line'}/>
                    <div className={'fbutton'} onClick={() => {
                        setCookie(hashes['system-logs'], true);
                        window.location.href = '/system-logs';
                    }}>ACCESS
                    </div>
                </div>
                <div className={'window'}>
                    <p className={'title message'}>OPERATION MANUALS</p>
                    <hr className={'line'}/>
                    <div className={'fbutton'}>READ</div>
                </div>
                <div className={'window reactor'}><h1 className={'critical pulse'}>REACTOR STATUS: OFFLINE</h1></div>

            </div>
        </>
    );
}

export default OS;