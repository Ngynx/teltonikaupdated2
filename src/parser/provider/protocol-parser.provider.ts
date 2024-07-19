import { calCRC16 } from "../utils/calculate-crc16.util";
import { Data } from "./AVL/data.provider";
import { PacketReader } from "../utils/packet-reader.util";

export class ProtocolParser {
    packet: string;
    preamble: number;
    data_length: number;
    codecID: number;
    quantity1: number;
    codecType: 'data_sending' | 'GPRS messages';
    content: Data | null
    quantity2: number;
    crc: number;
    constructor(
        packet: string,
        basic_read: boolean = false,
        on_ioElement_error: (e) => void = (e) => {throw e}
    ){
        let packet_reader = new PacketReader(packet, 2, (x: string) => {
            let y: any = parseInt(x, 16);
            if(y > Number.MAX_SAFE_INTEGER) {
                y = BigInt(`0x${x}`);
                y = y.toString();
            }
            return y;
        });
        this.packet = packet;
        this.preamble = packet_reader.read(4);
        if((this.preamble !== 0x00000000)||(this.preamble !== 0)) on_ioElement_error(new Error('Invalid preamble'));
        this.data_length = packet_reader.read(4);
        this.codecID = packet_reader.read(1);
        this.quantity1 = packet_reader.read(1);
        this.crc = packet_reader.readEnd(4);
        this.quantity2 = packet_reader.readEnd(1);
        if(this.quantity1 != this.quantity2) throw new Error('Invalid quantity');

        let crc_reader = new PacketReader(packet, 2, (x: string) => {
            let y: any = parseInt(x, 16);
            if(y > Number.MAX_SAFE_INTEGER) {
                y = BigInt(`0x${x}`);
                y = y.toString();
            }
            return y;
        });
        crc_reader.read(8);
        crc_reader.readEnd(4);
        const remaining_content: string = crc_reader.remainingContent();
        // console.log("remaining_content: ", remaining_content);
        const expectedCrc = calCRC16(remaining_content);
        if(expectedCrc != this.crc) throw new Error('Invalid CRC'); 
        let content: object|null = null;
        if([0x08, 0x08E, 0x10].includes(this.codecID)) {
            this.codecType = 'data_sending';
            if(!basic_read) content = new Data(packet_reader, on_ioElement_error, this.codecID, this.quantity1);
        } else {
            throw new Error('Invalid codec');
        }
        this.content = content as Data;
    }
}