import React, {useEffect, useState} from 'react';
import '../CSS/Login.scss';
import {useCookies} from "react-cookie";
import toast, {Toaster} from "react-hot-toast";


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

// this is the "login" page, where you enter your name and get access to the OS.
// this page shouldn't ever do much other than display the console text.
// TODO: spruce up the console text before you enter your name

function Login() {
    const [ct, setConsoleText] = useState(consoleText);
    const [, setCookie] = useCookies([]);
    const [cursorOffset, setCursorOffset] = useState(0);
    const [pattern,] = useState("");
    useEffect(() => {
        setInterval(() => {
            if (allConsoleTextIdx < allConsoleText.length) {
                consoleText += allConsoleText[allConsoleTextIdx];
                allConsoleTextIdx++;
            }
            setConsoleText(consoleText);
        }, 0); // CHANGE TO 0 FOR DEBUGGING
    }, [setCookie, cursorOffset]);
    return (
        <div className="App">
            <header className="App-header">
                <p className="console unselectable">
                    {ct}<span className="cursor" style={{marginLeft: `${cursorOffset * 9}px`}}>█</span>
                </p>
                <input autoFocus spellCheck={'false'} className={'hidden unselectable'} pattern={pattern}
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
                           if (e.key === "Enter") {
                               if (loginState === -1) {
                                   if (name !== 'ben') { // TODO: api call to check if name isn't taken
                                       loginState = 0;
                                       (e.target as HTMLInputElement).value = "";
                                       consoleText = consoleText.substring(0, consoleText.length - name.length);
                                       allConsoleText += `${name}\nENTER PASSWORD> `;
                                   } else {
                                       toast.error("Username already taken", {position: 'top-center'});
                                   }
                               } else if (loginState === 0) {
                                   console.log(password);
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
