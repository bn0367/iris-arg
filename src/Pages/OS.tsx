import React, {useEffect, useState} from 'react';

import "../CSS/glitch.scss";
import "../CSS/OS.scss";
import {useCookies} from "react-cookie";
import toast, {Toaster} from "react-hot-toast";


// this will be the "main hub": where all of the puzzles are stored, as well as the completion state
// TODO: add puzzles

let apiUrl = 'http://208.102.191.33:3001';

let chatMessage = "";

function OS() {
    const [ct, setChatText] = useState("");
    const [cookies,] = useCookies();
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
                <div className={'chat window'} style={{width: '98.87%'}}>
                    <p className={'title message'}>CHAT</p>
                    <hr style={{width: '100%'}}/>
                    <div className={'messages'}>
                        {messages.map((message, index) => {
                            return <div key={index}
                                        className={'message'}>[{new Date(message['time']).toLocaleTimeString("en-US", {
                                timeStyle: 'medium',
                                hour12: false
                            })}] &lt;{message['user']}&gt;: {message['message']}</div>
                        })}
                    </div>
                    <hr style={{width: '100%'}}/>
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
                                               console.log('else');
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
            <div className={'otherarea'}>
                <div className={'window'}><p>

                </p></div>
                <div className={'window'}><h1 className={'critical'}>REACTOR STATUS: CRITICAL</h1>
                </div>
                <div className={'window'}>
                    <p className={'title message'}>SYSTEM LOG</p>
                    <hr style={{width: '100%'}}/>
                    HELLO?????
                </div>
            </div>
        </>
    )
}

export default OS;