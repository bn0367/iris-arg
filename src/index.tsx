import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.scss';
import Access from "./Access";
import reportWebVitals from './typescript/reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import FourZeroFour from "./Pages/FourZeroFour";
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Login/>}/>
                    <Route path={"/404"} element={<FourZeroFour/>}/>
                    <Route path={":path"} element={<Access/>}/>
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>
);

reportWebVitals();
