// can't just use the page url as a hash because that's easily crackable, so i have to make my own secret plaintext
// TODO: there's definitely a more secure way to do this

const hashes: { [key: string]: string } = {
    os: "908cb77f76ca26a648e01bdbc2ee184be15ebd6de95d709849345dcc4abb19e7" // sha256 of 'irisospage'
};

export default hashes;