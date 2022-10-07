import React, {ReactElement, useEffect, useRef} from 'react';
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import Login from "./Pages/Login";
import FourZeroFour from "./Pages/FourZeroFour";
import OS from "./Pages/OS";
import OSEmployees from "./Pages/OSEmployees";
import {glitchshader, hashes} from "./typescript/consts";
import Disclaimer from "./Pages/Disclaimer";
import {apiUrl} from "./index";
import Loader from "./Pages/Loader";
import SystemLogs from "./Pages/SystemLogs";
import Files from "./Pages/Files";
import NothingWorks from "./Pages/NothingWorks";
import {Canvas, useFrame} from "@react-three/fiber";

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
        case 'files':
            return <Files/>;
        case 'nothing-works':
            return <NothingWorks/>;
        default:
            return <Login/>;
    }
}

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

function shaderWrap(page: any, shader: boolean): ReactElement<any, any> {
    if (shader) {
        return (
            <>
                {page}
                <Canvas className={'shader'} style={{position: "absolute", pointerEvents: "none"}}>
                    <ambientLight/>
                    <RefMesh uniforms={{time: {value: 0}}}>
                        <planeGeometry args={[100, 100]}/>
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
                setPage(shaderWrap(<Login/>, shadersEnabled));
                return;
            }
            if ('user' in res) {
                if (path in hashes) {
                    if (hashes[path] in cookies) {
                        setPage(shaderWrap(pages(path as string), shadersEnabled));
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
    }, [cookies, path]);
    if (path === undefined) {
        return <FourZeroFour/>;
    } else if (path === 'disclaimer' || path === 'nothing-works') { // disclaimer is always public
        return shaderWrap(pages(path), shadersEnabled);
    }

    return (page);
}

export default Access;