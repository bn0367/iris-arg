const rawshader = require('../shaders/glitch.glsl');

export const seed = cyrb128("supersecretseed");
export const random = mulberry32(seed[0]);

export const version = '0.1.0';

export const debug = 0;

export const hashes: { [key: string]: string } = {
    'os': "908cb77f76ca26a648e01bdbc2ee184be15ebd6de95d709849345dcc4abb19e7", // sha256 of 'irisospage'
    'os-employees': "caa7f0d861583f10e3f2aee39c047a388864c105f17d5710769e40a2dd4065d1", // sha256 of 'osemployeespage'
    'system-logs': "361154e8dc5a950717c560259da23b99326767ba1209bade9902c58031bb7334", // sha256 of 'systemlogspage'
    'files': "484986e0307009ee715c4f45fe908cf0519cf7d751b06f6ce41c28c447a4000c", // sha256 of 'manualspage'
};

export const reverseObject = (obj: { [key: string]: string }) => {
    const newObj: { [key: string]: string } = {};
    for (const key in obj) {
        newObj[obj[key]] = key;
    }
    return newObj;
}

export const OUTLIER = 4;
export const WATCHER = 22;

export const start = new Date(1973, 2, 1);
export const end = new Date(1973, 2, 7);

export const employees = [
    {'name': "Charlotte Chavez", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Taniya Lucero", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Sophie Crosby", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Alonso Shepard", 'position': 'Employee', 'access-date': '1973-02-24'},
    {'name': "Corbyn Belew", 'position': 'Employee', 'access-date': '1973-02-24'},
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
] as any[];


let order = shuffleRange(0, employees.length - 1);
let ipEnds = shuffleRange(0, 255);
ipEnds.splice(ipEnds.indexOf(98), 1);
ipEnds.splice(ipEnds.indexOf(131), 1);
for (let i = 0; i < employees.length; i++) {
    employees[order[i]]['id'] = i;
    employees[order[i]]['access-date'] = '1973-02-0' + parseInt((random() * 9).toString());
    employees[order[i]]['ip'] = '192.168.0.' + ipEnds[i];
}


employees[OUTLIER]['access-date'] = '1973-02-25';
employees[OUTLIER]['ip'] = '192.168.0.98';
employees[WATCHER]['access-date'] = '1973-02-24';
employees[WATCHER]['ip'] = '192.168.0.131';

export const logs = [] as string[];
let prevTime = start.getTime();
for (let i = 0; i < 100; i++) {
    let time = new Date(prevTime - random()
        * 1000 * 60 * 60);
    prevTime = time.getTime();
    logs.push(randomSystemLog(time, employees[random() * employees.length | 0].ip));
}

logs.splice(random() * logs.length | 0, 0, randomSystemLog(new Date(1973, 2, 1,), employees[OUTLIER].ip, 'Suspicious activity detected'));

export const cOptions = {
    path: '/',
    domain: debug ? '127.0.0.1' : '.irisarg.netlify.app',
}

function shuffleRange(start: number, end: number) {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// this function and the next are to have proper fixed-seed random numbers
function cyrb128(str: string) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

function mulberry32(a: number) {
    return function () {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}


function randomSystemLog(time: Date, addr: string, message?: string) {
    let m = message ?? randomSystemLogMessage();
    let s = '[' + time.toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '') + ']\t' + m;
    s = s.padEnd(60, ' ') + addr;
    return s;
}

function randomSystemLogMessage() {
    let messages = [ // i don't feel like making weighted random so i'm weighting it myself
        'Authentication failure for',
        'New login location for',
        'Password changed for',
        'Reactor restarted for maintenance by ',
        'Reactor levels changed by ',
        'Control software updated by ',
        'Control software updated by ',
    ]
    return messages[Math.floor(random() * messages.length)];
}

export var glitchshader = '';
fetch(rawshader)
    .then(r => r.text())
    .then(text => {
        glitchshader = text;
    });