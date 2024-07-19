export function getGPSdata(gum: number) {
    gum <<= 32; 
    gum >>= 32;
    gum = gum / 10000000;
    return gum;
}