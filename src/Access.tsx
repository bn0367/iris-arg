import React, {useEffect} from 'react';
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import Login from "./Pages/Login";
import FourZeroFour from "./Pages/FourZeroFour";
import OS from "./Pages/OS";
import OSEmployees from "./Pages/OSEmployees";
import {hashes} from "./typescript/consts";
import Disclaimer from "./Pages/Disclaimer";
import {apiUrl} from "./index";
import Loader from "./Pages/Loader";
import SystemLogs from "./Pages/SystemLogs";
import Manuals from "./Pages/Manuals";
import NothingWorks from "./Pages/NothingWorks";

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
        case 'system-logs':
            return <SystemLogs/>;
        case 'manuals':
            return <Manuals/>;
        case 'nothing-works':
            return <NothingWorks/>;
        default:
            return <Login/>;
    }
}

function Access() {
    const [cookies, ,] = useCookies([]);
    const [page, setPage] = React.useState(<Loader/>);
    const {path} = useParams();
    useEffect(() => {
        fetch(apiUrl + '/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: (cookies as any).token
            }),
        }).then(res => res.json()).then(res => {
            if (path === undefined) {
                setPage(<Login/>);
                return;
            }
            if ('user' in res) {
                if (path in hashes) {
                    if (hashes[path] in cookies) {
                        setPage(pages(path as string));
                    } else if (path !== 'os') {
                        setPage(<FourZeroFour/>);
                    } else {
                        setPage(<Login/>);
                    }
                } else {
                    setPage(<FourZeroFour/>);
                }
            } else {
                setPage(<Login/>);
            }
        });
    }, [cookies, path]);
    if (path === undefined) {
        return <FourZeroFour/>;
    } else if (path === 'disclaimer' || path === 'nothing-works') { // disclaimer is always public
        return pages(path);
    }

    return (page);
}

export default Access;