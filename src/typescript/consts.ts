export const seed = cyrb128("supersecretseed");
export const random = mulberry32(seed[0]);

export const version = '0.1.0';

export const debug = 0;

export const hashes: { [key: string]: string } = {
    'os': "908cb77f76ca26a648e01bdbc2ee184be15ebd6de95d709849345dcc4abb19e7", // sha256 of 'irisospage'
    'os-employees': "caa7f0d861583f10e3f2aee39c047a388864c105f17d5710769e40a2dd4065d1", // sha256 of 'osemployeespage'
    'system-logs': "361154e8dc5a950717c560259da23b99326767ba1209bade9902c58031bb7334", // sha256 of 'systemlogspage'
    'files': "484986e0307009ee715c4f45fe908cf0519cf7d751b06f6ce41c28c447a4000c", // sha256 of 'manualspage'
    'reactor': "c6ddc7390e95308b2dd7d29afb7207733e0b3713c3892e5c96ee7a75c7d66105", // sha256 of 'reactoroperation'
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

export const start = new Date(Date.parse('1973-02-01T00:00:00.000Z'));
export const end = new Date(Date.parse('1973-02-09T00:00:00.000Z'));

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
console.log(start.toISOString());
for (let i = 0; i < 100; i++) {
    let time = new Date(Date.parse('1973-02-01T00:00:00.000Z') + random() * (end.getTime() - start.getTime()));
    logs.push(randomSystemLog(time, employees[random() * employees.length | 0].ip));
}


logs.splice(0, 0, randomSystemLog(new Date(Date.parse('1973-02-24T05:17:38.000Z')),
    employees[OUTLIER].ip, 'SUSPICIOUS ACTIVITY DETECTED'));
logs.splice(0, 0, randomSystemLog(new Date(Date.parse('1973-02-24T05:16:38.000Z')),
    employees[WATCHER].ip, 'New login location for'));

logs.sort((a, b) => {
    let adString = a.split(']')[0].replace('[', '').replace(' ', 'T');
    let bdString = b.split(']')[0].replace('[', '').replace(' ', 'T');
    return Date.parse(adString) - Date.parse(bdString);
});

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
    let messages = [
        'Authentication failure for',
        'New login location for',
        'Password changed for',
        'Reactor restarted for maintenance by ',
        'Reactor levels changed by ',
        'Control software updated by ',
    ]
    return messages[Math.floor(random() * messages.length)];
}

export var glitchshader = `// adapted from https://www.shadertoy.com/view/lsfGD2

float sat(float t) {
    return clamp(t, 0.0, 1.0);
}

vec2 sat(vec2 t) {
    return clamp(t, 0.0, 1.0);
}

//remaps inteval [a;b] to [0;1]
float remap(float t, float a, float b) {
    return sat((t - a) / (b - a));
}

//note: /\\ t=[0;0.5;1], y=[0;1;0]
float linterp(float t) {
    return sat(1.0 - abs(2.0 * t - 1.0));
}

vec3 spectrum_offset(float t) {
    float t0 = 3.0 * t - 1.5;
    //return vec3(1.0/3.0);
    return clamp(vec3(-t0, 1.0 - abs(t0), t0), 0.0, 1.0);
}

//note: [0;1]
float rand(vec2 n) {
    return fract(sin(dot(n.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

//note: [-1;1]
float srand(vec2 n) {
    return rand(n) * 2.0 - 1.0;
}

float mytrunc(float x, float num_levels)
{
    return floor(x * num_levels) / num_levels;
}
vec2 mytrunc(vec2 x, float num_levels)
{
    return floor(x * num_levels) / num_levels;
}

uniform float time;
uniform vec2 resolution;

void main()
{
    float aspect = resolution.x / resolution.y;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.y = 1.0 - uv.y;

    float time2 = mod(time, 32.0);// + modelmat[0].x + modelmat[0].z;

    float GLITCH = rand(vec2(time2 * 0.1, 0.0)) * 1.0;

    //float rdist = length( (uv - vec2(0.5,0.5))*vec2(aspect, 1.0) )/1.4;
    //GLITCH *= rdist;

    float gnm = sat(GLITCH);
    float rnd0 = rand(mytrunc(vec2(time2, time2), 6.0));
    float r0 = sat((1.0 - gnm) * 0.7 + rnd0);
    float rnd1 = rand(vec2(mytrunc(uv.x, 10.0 * r0), time2));//horz
    //float r1 = 1.0f - sat( (1.0f-gnm)*0.5f + rnd1 );
    float r1 = 0.5 - 0.5 * gnm + rnd1;
    r1 = 1.0 - max(0.0, ((r1 < 1.0) ? r1 : 0.9999999));//note: weird ass bug on old drivers
    float rnd2 = rand(vec2(mytrunc(uv.y, 40.0 * r1), time2));//vert
    float r2 = sat(rnd2);

    float rnd3 = rand(vec2(mytrunc(uv.y, 10.0 * r0), time2));
    float r3 = (1.0 - sat(rnd3 + 0.8)) - 0.1;

    float pxrnd = rand(uv + time2);

    float ofs = 0.05 * r2 * GLITCH * (rnd0 > 0.5 ? 1.0 : -1.0);
    ofs += 0.5 * pxrnd * ofs;

    uv.y += 0.1 * r3 * GLITCH;

    const int NUM_SAMPLES = 100;
    const float RCP_NUM_SAMPLES_F = 1.0 / float(NUM_SAMPLES);

    vec4 sum = vec4(0.0);
    vec3 wsum = vec3(0.0);
    for (int i = 0; i < NUM_SAMPLES; ++i)
    {
        float t = float(i) * RCP_NUM_SAMPLES_F;
        uv.x = sat(uv.x + ofs * t);
        vec4 samplecol = vec4(rand(uv) * 0.1, rand(uv) * 0.1, rand(uv) * 0.1, 0.1);
        vec3 s = spectrum_offset(t);
        samplecol.rgb = samplecol.rgb * s;
        sum += samplecol;
        wsum += s;
    }
    sum.rgb /= wsum;
    sum.a *= RCP_NUM_SAMPLES_F;

    //fragColor = vec4( sum.bbb, 1.0 ); return;

    gl_FragColor.a = sum.a;
    gl_FragColor.rgb = sum.rgb;// * outcol0.a;
}`;