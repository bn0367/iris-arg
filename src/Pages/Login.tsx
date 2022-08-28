import React, {useEffect, useState} from 'react';
import '../CSS/Login.scss';
import {useCookies} from "react-cookie";
import hashes from "../SavedHashes";


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

let keyReset = "";

function Login() {
    const [, setConsoleText] = useState(consoleText);
    const [, setCookie] = useCookies([]);
    useEffect(() => {
        document.body.addEventListener("keydown", (e) => {
            if (allConsoleTextIdx >= allConsoleText.length - 1) {
                if (keyReset.length === 0) {
                    keyReset = e.key;
                    if (e.key === "Backspace") {
                        consoleText = consoleText.slice(0, -1);
                        name = name.slice(0, -1);
                        setConsoleText(consoleText);
                    } else if (e.key.toUpperCase() !== e.key.toLowerCase() && e.key.length === 1) {
                        if (name.length < (39 - 14)) {
                            consoleText += e.key.toUpperCase();
                            name += e.key.toLowerCase();
                            setConsoleText(consoleText);
                        }
                    } else if (e.key === "Enter") {
                        // @ts-ignore ??? why is this not working?
                        setCookie("name", name, {path: "/"});
                        // @ts-ignore
                        setCookie(hashes["os"], "true", {path: "/"});
                        // redirect to OS
                        window.location.href = "/os";
                    }
                }
            }
        });
        document.body.addEventListener("keyup", (e) => {
            if (e.key === keyReset) {
                keyReset = "";
            }
        });

        let interval = setInterval(() => {
            if (allConsoleTextIdx < allConsoleText.length) {
                consoleText += allConsoleText[allConsoleTextIdx];
                allConsoleTextIdx++;
            } else {
                clearInterval(interval);
            }
            setConsoleText(consoleText);
        }, 0); // CHANGE TO 0 FOR DEBUGGING
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <p className="console unselectable">
                    {consoleText}<span className="cursor">█</span>
                </p>
            </header>
        </div>
    );
}

export default Login;
