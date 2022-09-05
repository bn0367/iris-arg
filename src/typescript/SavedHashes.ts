// can't just use the page url as a hash because that's easily crackable, so i have to make my own secret plaintext
// TODO: there's definitely a more secure way to do this

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

export default hashes;