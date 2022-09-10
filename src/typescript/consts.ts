export const debug = 1;

export const hashes: { [key: string]: string } = {
    'os': "908cb77f76ca26a648e01bdbc2ee184be15ebd6de95d709849345dcc4abb19e7", // sha256 of 'irisospage'
    'os-employees': "caa7f0d861583f10e3f2aee39c047a388864c105f17d5710769e40a2dd4065d1" // sha256 of 'osemployeespage'
};

export const reverseObject = (obj: { [key: string]: string }) => {
    const newObj: { [key: string]: string } = {};
    for (const key in obj) {
        newObj[obj[key]] = key;
    }
    return newObj;
}

export const employees = [
    {'name': "Charlotte Chavez", 'position': 'Employee', 'access-date': '1973-02-24'},
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
    {'name': "Amelia Mckenzie", 'position': 'Employee', 'access-date': '1973-02-24'}
];

export const cOptions = {
    path: '/',
    domain: debug ? '127.0.0.1' : '.irisarg.netlify.app',
}