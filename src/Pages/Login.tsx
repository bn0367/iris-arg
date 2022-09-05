import React, {useEffect, useState} from 'react';
import '../CSS/Login.scss';
import {useCookies} from "react-cookie";
import toast, {Toaster} from "react-hot-toast";
import {hashes} from "../typescript/SavedHashes";
import {apiUrl} from "../index";
import debug from "../typescript/DEBUG";


let timeWaster = "‍";

function intersperse(str: string, amount: () => number): string {
    return str.split('').reduce((acc, cur,) => {
        acc += timeWaster.repeat(amount());
        acc += cur;
        return acc;
    });
}

function typingTime() {
    return Math.floor(Math.random() * (50 - 25 + 1)) + 25;
}

// each line is 39 characters long
let allConsoleText: String =
    "             '=?1emSSme1~,`            \n" +
    "         `*mB@@@@@@@@@@@bQ@Bmr`        \n" +
    "       `k@@@@@@@@@@@@@@@bQ@@@@@K=      \n" +
    "     _E@8DDQ@@@@@@@@@@@@bQ@@@@@@@O,    \n" +
    "    |@@@@@@#DD$#@@@@@@@@bQ@@@@@@@@@|   \n" +
    "   }@@@@@@@@@@@QDDg@@@@@bQ@@@@@@@@@@z  \n" +
    "  ;@@@@@@@@@@@@@@#y_*f#@bQ@@@@@@@@@@@` \n" +
    "  g@@@@@@@@@@@D|_      _!Q@@@@@@@#DDNO \n" +
    "  @@@@@@@@QDD8B          Q@@@@gDDB@@@@`\n" +
    "  @@@@#DD$#@@@#          8QDD8@@@@@@@@`\n" +
    "  N8DDQ@@@@@@@#=`      .?d#@@@@@@@@@@8 \n" +
    "  \"@@@@@@@@@@@#A@8V~`u8@@@@@@@@@@@@@@^\n" +
    "   u@@@@@@@@@@#A@@@@@gDD#@@@@@@@@@@@e  \n" +
    "    Y@@@@@@@@@#A@@@@@@@@#DDN@@@@@@@Y   \n" +
    "     ,N@@@@@@@#A@@@@@@@@@@@@8DDQ@N=    \n" +
    "       ~d@@@@@#A@@@@@@@@@@@@@@@U_      \n" +
    "         `?A#@#A@@@@@@@@@@@#A(`        \n" +
    "             `=^zUAbbAUzi>'            \n" +
    intersperse("     WELCOME TO I.R.I.S. OS v0.1.0     \n", () => 5) +
    timeWaster.repeat(100) + intersperse("WHO ARE YOU?> ", typingTime);

let consoleText: String = "";
let allConsoleTextIdx: number = 0;
let name: string = "";
let password: string = "";

let loginState = -1;
let accountExists = 0;
let verifyRequest = false;

const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
const passwordRegex = /^[a-zA-Z0-9 !@#$%^&*]{6,20}$/;

// this is the "login" page, where you enter your name and get access to the OS.
// this page shouldn't ever do much other than display the console text.
// TODO: spruce up the console text before you enter your name

function Login() {
    const [ct, setConsoleText] = useState(consoleText);
    const [cookies, setCookie, delCookie] = useCookies<string>([]);
    const [cursorOffset, setCursorOffset] = useState(0);
    useEffect(() => {
        if ('token' in cookies && !verifyRequest) {
            verifyRequest = true;
            fetch(apiUrl + '/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: cookies.token
                })
            }).then(res => res.json()).then(res => {
                if ('user' in res) {
                    verifyRequest = false;
                    window.location.href = '/os';
                } else {
                    delCookie('token');
                }
            });
        }
    }, [cookies, delCookie]);
    useEffect(() => {
        setInterval(() => {
            if (allConsoleTextIdx < allConsoleText.length) {
                consoleText += allConsoleText[allConsoleTextIdx];
                allConsoleTextIdx++;
            }
            setConsoleText(consoleText);
        }, debug ? 0 : 10); // CHANGE TO 0 FOR DEBUGGING
    }, [setCookie, cursorOffset]);
    return (
        <div className="App">
            <header className="App-header">
                <p className="console unselectable">
                    {ct}<span className="cursor" style={{marginLeft: `${cursorOffset * 9}px`}}>█</span>
                </p>
                <input autoFocus spellCheck={'false'} className={'hidden unselectable'}
                       onBlur={({target}) => target.focus()} type={'text'}
                       onInput={(e) => {
                           let text = (e.target as HTMLInputElement).value;
                           if (loginState === -1) {
                               name = text;

                           } else if (loginState === 0) {
                               password = text;
                           }
                           consoleText = allConsoleText + text;
                           setConsoleText(consoleText as string);
                       }}
                       onSelect={(e) => {
                           let element = e.target as HTMLInputElement;
                           element.selectionStart = element.selectionEnd;
                           setCursorOffset((element.selectionStart as number) - element.value.length);
                       }}
                       onKeyUp={(e) => {
                           let element = e.target as HTMLInputElement;
                           if (e.key.toLowerCase() === "enter" || e.key.toLowerCase() === "return") {
                               if (loginState === -1) {
                                   if (!usernameRegex.test(name)) {
                                       toast.error("Invalid username (must only contain letters and numbers, and be at least 3 characters long)");
                                       return;
                                   }
                                   fetch(apiUrl + '/api/user/' + name, {
                                       method: 'GET',
                                       headers: {
                                           accept: 'application/json',
                                       }
                                   }).then(res => res.json()).then(res => {
                                       if ('notFound' in res || !('user' in res)) {
                                           loginState = 0;
                                           (e.target as HTMLInputElement).value = "";
                                           consoleText = consoleText.substring(0, consoleText.length - name.length);
                                           allConsoleText += `${name}\nNEW USER DETECTED\nCREATE PASSWORD> `;
                                           accountExists = 0;
                                       } else {
                                           loginState = 0;
                                           (e.target as HTMLInputElement).value = "";
                                           consoleText = consoleText.substring(0, consoleText.length - name.length);
                                           allConsoleText += `${name}\nEXISTING USER DETECTED\nIF THIS IS NOT YOU PLEASE RELOAD OTHERWISE\nENTER PASSWORD> `;
                                           accountExists = 1;
                                       }
                                   });

                               } else if (loginState === 0) {
                                   if (!passwordRegex.test(password)) {
                                       toast.error("Invalid password: must only contain letters, numbers, or symbols (!@#$%^&* ) and be at least 6 characters long");
                                       return;
                                   }
                                   let postUrl = accountExists === 1 ? apiUrl + '/api/login/' : apiUrl + '/api/register';
                                   fetch(postUrl, {
                                       method: 'POST',
                                       headers: {
                                           'Content-Type': 'application/json',
                                       },
                                       body: JSON.stringify({
                                           user: name,
                                           password: password,
                                       })
                                   }).then(res => res.json()).then(res => {
                                       if ('message' in res && res.message !== "success") {
                                           toast.error(res.message);
                                       } else if ('token' in res) {
                                           // @ts-ignore
                                           setCookie('user', name, {path: '/'});
                                           // @ts-ignore
                                           setCookie(hashes['os'], true, {path: '/'});
                                           // @ts-ignore
                                           setCookie('token', res.token, {path: '/', maxAge: 60 * 60 * 24});
                                           window.location.href = '/os';
                                       } else {
                                           toast.error("An unknown error occurred");
                                       }
                                   });
                               }
                           } else if (e.key === "Backspace" || e.key === "Delete") {
                               setCursorOffset((element.selectionStart as number) - element.value.length);
                           }
                       }}
                />
            </header>
            <Toaster/>
        </div>
    );
}

export default Login;
