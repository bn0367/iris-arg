import React, {useEffect} from "react";
import '../CSS/OS.scss';
import '../CSS/glitch.scss';


let names = ["Charlotte Chavez",
    "Taniya Lucero",
    "Sophie Crosby",
    "Alonso Shepard",
    "Corbin Navarro",
    "Amari Eaton",
    "Selah Goodwin",
    "Jewel Conway",
    "Karissa Atkinson",
    "Malakai Barr",
    "Alanna Cain",
    "Lainey Odonnell",
    "Hillary Jarvis",
    "Gabrielle Nguyen",
    "Jayden Barr",
    "Alvaro Norton",
    "Dennis Avila",
    "Khloe Harding",
    "Shiloh Stephenson",
    "Jimmy Thompson",
    "Anabel Farrell",
    "Mathias Massey",
    "Dahlia Gilmore",
    "Autumn Simon",
    "Olivia Rios",
    "Marcelo Sutton",
    "Taniyah Mckay",
    "Kyan Pittman",
    "Amelia Mckenzie"
];
const randomString = (len: number) => {
    let text = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'\";:?,./|~";

    for (let i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

function OSEmployees() {
    useEffect(() => {
        document.title = "Employees | OS";
        setInterval(() => {
            let elements = document.getElementsByClassName('randomize');
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                element.innerHTML = randomString(20);
            }
        }, 100);
    }, []);

    return (
        <>
            <div className={'fbutton corner'} onClick={() => window.location.href = '/os'}>BACK</div>
            <div className={'fill window'}>
                <p className={'title message'}>EMPLOYEE DIRECTORY</p>
                <hr className={'line'}/>
                <div className={'messages'}>
                    <table className={'directory'}>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>POSITION</th>
                            <th>EMAIL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {names.map((name, index) => {
                            return (
                                <tr key={index}>
                                    <td>{name}</td>
                                    <td>Employee</td>
                                    <td className={'randomize'}>{randomString(20)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default OSEmployees;