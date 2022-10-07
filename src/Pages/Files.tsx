import React from 'react';
import '../CSS/OS.scss';

function Files() {
    return (<>
            <div className={'fbutton corner'} onClick={() => window.location.href = '/os'}>BACK</div>
            <div className={'window fill'}>
                <h1 className={'App-header'}>Files</h1>
                <p className={'message App-header'}>⚠️Under Construction ⚠️</p>
                <input placeholder={'Search...'} type="text" className={'message input'}/>
            </div>
        </>
    );
}

export default Files;