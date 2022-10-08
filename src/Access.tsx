import React, {ReactElement, useEffect, useRef} from 'react';
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import Login from "./Pages/Login";
import FourZeroFour from "./Pages/FourZeroFour";
import OS from "./Pages/OS";
import OSEmployees from "./Pages/OSEmployees";
import {glitchshader, hashes, random} from "./typescript/consts";
import Disclaimer from "./Pages/Disclaimer";
import {apiUrl} from "./index";
import Loader from "./Pages/Loader";
import SystemLogs from "./Pages/SystemLogs";
import Files from "./Pages/Files";
import NothingWorks from "./Pages/NothingWorks";
import {Canvas, useFrame} from "@react-three/fiber";
import Reactor from "./Pages/Reactor";
import ConnectionLost from "./Pages/ConnectionLost";

// this page isn't a real page, but serves as my own custom router to not let people load pages they don't have access to,
// even if they know the page url.

function pages(path: string, finished: boolean) {
    if (finished) {
        return <ConnectionLost/>;
    }
    switch (path.toLowerCase()) {
        case "os":
            return <OS/>;
        case "os-employees":
            return <OSEmployees/>;
        case 'disclaimer':
            return <Disclaimer/>;
        case 'system-logs':
            return <SystemLogs/>;
        case 'files':
            return <Files/>;
        case 'nothing-works':
            return <NothingWorks/>;
        case 'reactor':
            return <Reactor/>;
        default:
            return <Login/>;
    }
}

let delay: number = 0;
let delayMax: number = 10;

function RefMesh({children}: any) {
    const refMesh = useRef();

    useFrame(() => {
        if (refMesh.current) {
            // @ts-ignore
            if (refMesh.current.material.uniforms.time) {
                delay += 1;
                if (delay >= delayMax) {
                    // @ts-ignore
                    refMesh.current.material.uniforms.time.value += 0.01;
                    delay = 0;
                    delayMax = Math.floor(random() * 20);
                }
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

function shaderWrap(page: any, shader: boolean): ReactElement<any, any> {
    if (shader) {
        return (
            <>
                {page}
                <Canvas className={'shader'} style={{position: "absolute", pointerEvents: "none"}}>
                    <RefMesh uniforms={{time: {value: 0}}}>
                        <planeGeometry args={[window.innerWidth / 70, window.innerHeight / 70]}/>
                        <shaderMaterial fragmentShader={glitchshader}/>
                    </RefMesh>
                </Canvas>
            </>
        )
    } else {
        console.log("page");
        return (
            <>{page}</>
        )
    }
}

function Access() {
    const [cookies, ,] = useCookies([]);
    const [page, setPage] = React.useState(<Loader/>);
    const {path} = useParams();
    let shadersEnabled = !("noshaders" in cookies);
    let finished = "finished" in cookies;
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
            if (finished) {
                setPage(<ConnectionLost/>);
                return;
            }
            if (path === undefined) {
                setPage(shaderWrap(<Login/>, shadersEnabled));
                return;
            }
            if ('user' in res) {
                if (path in hashes) {
                    if (hashes[path] in cookies) {
                        setPage(shaderWrap(pages(path as string, finished), shadersEnabled));
                    } else if (path !== 'os') {
                        setPage(shaderWrap(<FourZeroFour/>, shadersEnabled));
                    } else {
                        setPage(shaderWrap(<Login/>, shadersEnabled));
                    }
                } else {
                    setPage(shaderWrap(<FourZeroFour/>, shadersEnabled));
                }
            } else {
                setPage(shaderWrap(<Login/>, shadersEnabled));
            }
        });
    }, [cookies, path, shadersEnabled, finished]);
    if (path === undefined) {
        return <FourZeroFour/>;
    } else if (path === 'disclaimer' || path === 'nothing-works') { // disclaimer is always public
        return shaderWrap(pages(path, false), shadersEnabled);
    }
    return (page);
}

export default Access;