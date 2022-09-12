import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.scss';
import Access from "./Access";
import reportWebVitals from './typescript/reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import FourZeroFour from "./Pages/FourZeroFour";
import {CookiesProvider} from "react-cookie";
import {debug, version} from "./typescript/consts";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export const apiUrl = debug ? 'http://localhost:3001' : 'https://34.133.38.220:3001';

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Login/>}/>
                    <Route path={"/404"} element={<FourZeroFour/>}/>
                    <Route path={":path"} element={<Access/>}/>
                </Routes>
                <p className={'disclaimer message'} onClick={() => window.location.href = '/disclaimer'}
                   style={{cursor: 'pointer'}}>disclaimer</p>
                <br/>
                <p className={'version message'}>{version}</p>
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>
);

reportWebVitals();
