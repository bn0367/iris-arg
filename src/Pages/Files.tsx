import React, {useEffect} from 'react';
import '../CSS/OS.scss';
import {debug, random} from "../typescript/consts";

import testing from '../Audio/testing.mp3';

function bar(status: number, max: number) {
    let bar = '[';
    for (let i = 0; i < max; i++) {
        if (i < status) {
            bar += '█';
        } else {
            bar += ' ';
        }
    }
    return bar + ']';
}

const barMax = 50;

const corruptedFiles = <>
    <h2 className={"glitch layers centered"} data-text={"USER FILES CORRUPTED OR USER DOES NOT EXIST"}>USER FILES
        CORRUPTED OR USER DOES NOT EXIST</h2>
</>;

const corbynFiles = <>
    <h2 className={'centered'}>LOG 1973-02-03 BELEW, CORBYN</h2>
    <audio style={{width: '100%'}} src={testing} controls={true}/>
</>;

const dahliaFiles = <>
    <h2 className={'centered'}>LOG 1973-02-03 GILMORE, DAHLIA</h2>
    <audio style={{width: '100%'}} src={testing} controls={true}/>
</>;


function Files() {
    const [files, setFiles] = React.useState(<></>);
    const [searching, setSearching] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [search, setSearch] = React.useState('');
    useEffect(() => {
        if (searching) {
            let i = setInterval(() => {
                if (progress < barMax) {
                    setProgress(p => p + 1);
                } else {
                    setSearching(false);
                    setProgress(0);
                    switch (search.replace(/ /g, '').toLowerCase()) {
                        case 'corbyn':
                        case 'belew':
                        case 'corbynbelew':
                            setFiles(corbynFiles);
                            break;
                        case 'dahlia':
                        case 'gilmore':
                        case 'dahliagilmore':
                            setFiles(dahliaFiles);
                            break;
                        default:
                            setFiles(corruptedFiles);
                    }
                }
            }, random() * 250 * debug ? 0 : 1);
            return () => clearInterval(i);
        }
    }, [searching, files, progress, search]);
    return (<>
            <div className={'fbutton corner'} onClick={() => window.location.href = '/os'}>BACK</div>
            <div className={'window fill'}>
                <h1 className={'App-header'}>Employee Files</h1>
                <input placeholder={'Employee Name...'} type="text" className={'message search'} onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === 'Return') {
                        setSearching(true);
                        setProgress(0);
                        setFiles(<></>);
                    }
                }} onInput={(e) => {
                    setSearch((e.target as HTMLInputElement).value);
                }}/>
                <h3 className={'App-header'}
                    style={{visibility: searching ? 'visible' : 'hidden'}}>{bar(progress, 50)}</h3>
                {files}
            </div>
        </>
    );
}

export default Files;