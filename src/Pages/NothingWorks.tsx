import React from "react";
import '../CSS/OS.scss';

function NothingWorks() {
    return (
        <div className="window fill" style={{overflowY: 'hidden'}}>
            <h1>Nothing working?</h1>
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
        </div>
    );
}

export default NothingWorks;