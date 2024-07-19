export function hetToBuffer(string:string) {
    if(string.length % 2 !== 0) throw new Error('Invalid hex string');
    let bytes = new Uint8Array(string.length / 2);
    for (let c = 0, i = 0; c < string.length; c +=2, i++) {
        // bytes[i] = parseInt(string.substring(c, 2), 16);
        bytes[i] = parseInt(string.substr(c, 2), 16);
    }
    return bytes;
}