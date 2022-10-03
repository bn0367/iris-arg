import React, {useEffect, useRef, useState} from 'react';

import "../CSS/glitch.scss";
import "../CSS/OS.scss";
import {useCookies} from "react-cookie";
import toast, {Toaster} from "react-hot-toast";
import {glitchshader, hashes} from "../typescript/consts";
import {apiUrl} from "../index";
import _ from "lodash";
import {Canvas, useFrame} from "@react-three/fiber";

let chatMessage = "";

let history = 20;
let chatRefreshTime = 1000;

function RefMesh({children}: any) {
    const refMesh = useRef();

    useFrame(() => {
        if (refMesh.current) {
            // @ts-ignore
            if (refMesh.current.material.uniforms.time) {
                // @ts-ignore
                refMesh.current.material.uniforms.time.value += 0.01;
            } else {
                // @ts-ignore
                refMesh.current.material.uniforms.time = {value: 0};
            }
            // @ts-ignore
            refMesh.current.material.uniforms.resolution = {value: [window.innerWidth, window.innerHeight]};
        }
    });
    return (<mesh ref={refMesh}>{children}</mesh>);
}

function OS() {
    const [ct, setChatText] = useState("");
    const [cookies, setCookie,] = useCookies();
    const [cursorOffset, setCursorOffset] = useState(0);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const f = async () => {
            const res = await fetch(apiUrl + "/api/chat/poll", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
            const data = await res.json();
            if (!_.isEqual(data, messages) || data.length !== messages.length) {
                setMessages(data);
                let chat = document.getElementsByClassName("messages")[0];
                chat.scrollTop = chat.scrollHeight + chat.scrollTop;
            }


        }
        f().then(() => {
        });
        const interval = setInterval(() => {
            f().then(() => {
            });
        }, chatRefreshTime);
        return () => {
            clearInterval(interval);
        };
    }, [messages]);
    return (
        <>
            <Canvas className={'shader'} style={{position: "absolute"}}>
                <ambientLight/>
                <RefMesh uniforms={{time: {value: 0}}}>
                    <planeGeometry args={[100, 100]}/>
                    <shaderMaterial fragmentShader={glitchshader}/>
                </RefMesh>
            </Canvas>
            <div className={'chatarea'}>
                <div className={'chat window'}>
                    <p className={'title message chattitle'}>EMPLOYEE CHAT</p>
                    <div className={'messages'}>
                        {Array.apply(null, Array(messages.length > 1 ? 0 : 1)).map((_, i) => {
                            return <div className={'message'} key={history - i}>&nbsp;</div>
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
                    <p className={'title message'}>EMPLOYEE FILES</p>
                    <hr className={'line'}/>
                    <div className={'fbutton'} onClick={() => {
                        setCookie(hashes['files'], true);
                        window.location.href = '/files';
                    }}>READ
                    </div>
                </div>
                <div className={'window'}>
                    <p className={'title message'}>REACTOR CONTROLS</p>
                    <hr className={'line'}/>
                    <div className={'fbutton disabled'}>OPERATE</div>
                </div>
                <div className={'window reactor'}><h1 className={'critical pulse'}>REACTOR STATUS: OFFLINE</h1></div>
            </div>
        </>
    );
}

export default OS;