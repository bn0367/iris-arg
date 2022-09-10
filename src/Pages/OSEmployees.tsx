import React, {useEffect} from "react";
import '../CSS/OS.scss';
import '../CSS/glitch.scss';
import {employees} from "../typescript/consts";


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
                        {employees.map((employee, index) => {
                            return (
                                <tr key={index} className={'trselect'} onClick={() => {
                                    if (document.getElementsByClassName('modal').length === 0) {
                                        document.getElementById(`modal${index}`)?.classList.add('modal');
                                        document.getElementById(`modal${index}`)?.classList.add('animwindow');
                                        document.getElementById(`modal${index}`)?.classList.remove('hidden');
                                        setTimeout(() => {
                                            document.getElementById(`modal${index}`)?.classList.remove('animwindow');
                                        }, 2000);
                                    }
                                }}>
                                    <td>{employee.name}</td>
                                    <td>{employee.position}</td>
                                    <td className={'randomize'}>{randomString(20)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                </div>
                <>
                    {employees.map((employee, index) => {
                        return (
                            <div key={index} className={'window hidden'} id={`modal${index}`}>
                                <p className={'title'}>{employee.name}</p>
                                <img src={'images/picture.png'} alt={'default profile'}
                                     className={'profile'}/>
                                <br/>
                                <p className={'message'}>Last Login: {employee["access-date"]}</p>
                                <div className={'fbutton close'} onClick={() => {
                                    document.getElementById(`modal${index}`)?.classList.remove('modal');
                                    document.getElementById(`modal${index}`)?.classList.remove('animwindow');
                                    document.getElementById(`modal${index}`)?.classList.add('hidden');
                                }}>X
                                </div>
                            </div>
                        );
                    })}
                </>
            </div>

        </>
    );
}

export default OSEmployees;