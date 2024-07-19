import { hetToBuffer } from "./hexToBuffer.util";

export const calCRC16 = (bytes: string|Uint8Array): string|number => {
    if(typeof(bytes) === 'string') bytes = hetToBuffer(bytes);
    const preset = 0&0xFFFF;
    const polynom = 0xA001 & 0xFFFF;
    let crc = preset;
    for(let i = 0; i < bytes.length; i++) {
        crc ^= bytes[i];
        for(let j = 0; j < 8; j++) {
            // if(crc & (1)) {
            //     crc = (crc >> 1) ^ polynom;
            // } else {
            //     crc = crc >> 1;
            // }
            crc = (crc & 0x0001) ? ((crc >> 1) ^ polynom) : (crc >> 1);
        }
    }
    return crc & 0xFFFF;

}

