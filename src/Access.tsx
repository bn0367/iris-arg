import React from 'react';
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import Login from "./Pages/Login";
import FourZeroFour from "./Pages/FourZeroFour";
import OS from "./OS";
import hashes from "./SavedHashes";


function pages(path: string) {
    switch (path.toLowerCase()) {
        case "os":
            return <OS/>;
        default:
            return <Login/>;
    }
}

function Access() {
    const [cookies,,] = useCookies([]);
    let {path} = useParams();
    if (path === undefined) {
        return <FourZeroFour/>;
    }
    if (path in hashes) {
        if (hashes[path] in cookies) {
            return pages(path as string);
        } else {
            return <FourZeroFour/>;
        }
    }
    return <FourZeroFour/>;
}

export default Access;