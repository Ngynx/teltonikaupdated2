export function parseIMEI(imei: string): string {
    const re = / /gi;
    imei = imei.toLowerCase().replace(re, '');
    let decodedIMEI = '';
    for (let i = imei.length - 1; i > 3; i -= 2)
        decodedIMEI = imei.charAt(i) + decodedIMEI;
    return decodedIMEI;
}