import React from 'react';
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import Login from "./Pages/Login";
import FourZeroFour from "./Pages/FourZeroFour";
import OS from "./Pages/OS";
import OSEmployees from "./Pages/OSEmployees";
import hashes from "./typescript/SavedHashes";
import Disclaimer from "./Pages/Disclaimer";

// this page isn't a real page, but serves as my own custom router to not let people load pages they don't have access to,
// even if they know the page url.

function pages(path: string) {
    switch (path.toLowerCase()) {
        case "os":
            return <OS/>;
        case "os-employees":
            return <OSEmployees/>;
        case 'disclaimer':
            return <Disclaimer/>;
        default:
            return <Login/>;
    }
}

function Access() {
    const [cookies, ,] = useCookies([]);
    let {path} = useParams();
    if (path === undefined) {
        return <FourZeroFour/>;
    } else if (path === 'disclaimer') { // disclaimer is always public
        return pages(path);
    }
    if (path in hashes) {
        if (hashes[path] in cookies) {
            return pages(path as string);
        } else if (path !== 'os') {
            return <FourZeroFour/>;
        } else {
            return <Login/>;
        }
    }
    return <FourZeroFour/>;
}

export default Access;