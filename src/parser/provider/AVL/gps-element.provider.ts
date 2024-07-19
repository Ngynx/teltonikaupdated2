import { getGPSdata } from "src/parser/utils/getGPSdata.util";
import { PacketReader } from "../../utils/packet-reader.util"

export class GPSelement {
    longitude: number;
    latitude: number;
    altitude: number;
    angle: number;
    satellites: number;
    speed: number;
    constructor(packet_reader: PacketReader<number>) {
        this.longitude = getGPSdata(packet_reader.read(4));
        this.latitude = getGPSdata(packet_reader.read(4));
        this.altitude = packet_reader.read(2);
        this.angle = packet_reader.read(2);
        this.satellites = packet_reader.read(1);
        this.speed = packet_reader.read(2);
    }

}