import { PacketReader } from "../../utils/packet-reader.util";
import { GPSelement } from "./gps-element.provider";
import { IOelement } from "./ioElement.provider";

export class AVLData {
    timestamp: Date;
    priority: number;
    gpsElement: object;
    ioElement: object;
    constructor(packet_reader: PacketReader<number>, on_ioelement_error: (e) => void, codec_id: number) {
        this.timestamp = new Date(packet_reader.read(8));
        this.priority = packet_reader.read(1);
        this.gpsElement = new GPSelement(packet_reader);
        this.ioElement = new IOelement(packet_reader, on_ioelement_error, codec_id);
    }
}