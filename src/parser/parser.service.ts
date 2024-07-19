import { Injectable } from "@nestjs/common";
import { ProtocolParser } from "./provider/protocol-parser.provider";
import { hetToBuffer } from "./utils/hexToBuffer.util";

@Injectable()
export class ParserService {
    // private packetData: string;
    constructor() {}

    async parseSendData(packet: string): Promise<object> {
        const parsed = new ProtocolParser(packet, false, (e) => {throw e});
        console.log('Data parsed: ', JSON.stringify(parsed, null, 1))
        return parsed; 
    }

    serializeToHex(): any {
        const hexRawData = "499602d2"
        // const jsonStr = JSON.stringify(null);
        // const buffer = Buffer.from(jsonStr);
        // const hexStr = buffer.toString('hex');
        // return hexStr;
        const hexData = parseInt(hexRawData, 16)
        const dataParsed = hetToBuffer(hexData.toString());

        //** BUFFER TO STR */
        const jsonStr = JSON.stringify(dataParsed);
        const buffer = Buffer.from(jsonStr);
        return buffer.toString('utf-8');
        // return dataParsed;
    }


}