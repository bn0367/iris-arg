import React, {useEffect} from "react";
import '../CSS/OS.scss';
import '../CSS/glitch.scss';


let employees = [{'name': "Charlotte Chavez", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Taniya Lucero", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Sophie Crosby", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Alonso Shepard", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Corbin Navarro", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Amari Eaton", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Selah Goodwin", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Jewel Conway", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Karissa Atkinson", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Malakai Barr", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Alanna Cain", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Lainey Odonnell", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Hillary Jarvis", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Gabrielle Nguyen", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Jayden Barr", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Alvaro Norton", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Dennis Avila", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Khloe Harding", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Shiloh Stephenson", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Jimmy Thompson", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Anabel Farrell", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Mathias Massey", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Dahlia Gilmore", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Autumn Simon", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Olivia Rios", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Marcelo Sutton", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Taniyah Mckay", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Kyan Pittman", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Amelia Mckenzie", 'position': 'Employee', 'access-date': '1973-02-24'}]
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
                                <tr key={index} onClick={() => {
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
            </div>

        </>
    );
}

export default OSEmployees;