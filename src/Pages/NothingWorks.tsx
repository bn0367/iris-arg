import React from "react";
import '../CSS/OS.scss';
import {useCookies} from "react-cookie";

function NothingWorks() {
    const [cookies, setCookie, delCookie] = useCookies();
    return (
        <div className="window fill" style={{overflowY: 'hidden'}}>
            <h1>Troubleshooting</h1>
            <h3>Nothing working?</h3>
            <p style={{whiteSpace: 'pre-line'}}>
                If nothing is working (i.e. when you hit enter on the login page, nothing happens), try visiting <a
                href={"https://34.133.38.220:3001"}>the api</a> to make sure your browser is okay with the
                certificate.<br/>
                When you click on this link, if you see an error saying that the certificate is invalid/insecure, that
                is unfortunately expected, as it is a self-signed certificate.<br/> It is safe -- it is simply used for
                logging in and out as well as sending and receiving chat messages. (All passwords are sent encrypted via
                SSL,
                and the plaintext versions are never stored).<br/> In chrome/chromium browsers you may
                need to click on advanced, and then click on proceed anyway. If you are still having issues, please
                contact <a href={"bnewman@oberlin.edu"}>bnewman@oberlin.edu</a>.
            </p>
            <h3>Website running slow?</h3>
            <p style={{whiteSpace: 'pre-line'}}>
                If the website is running slow, if you can, turn on hardware acceleration in your browser. If that
                doesn't help/you don't want to, {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href={"#"} onClick={
                () => {
                    if ("noshaders" in cookies) {
                        delCookie("noshaders");
                    } else {
                        setCookie("noshaders", "");
                    }
                    window.location.reload();
                }
            }>toggle shaders</a>.
            </p>
            <h3>Want to reset progress?</h3>
            <p style={{whiteSpace: 'pre-line'}}>
                If you want to reset your progress, {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href={"##"} onClick={() => {
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                window.location.reload();
            }}>click here</a>.
            </p>
        </div>
    );
}

export default NothingWorks;