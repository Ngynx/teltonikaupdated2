import { PacketReader } from "../../utils/packet-reader.util";
import { AVLData } from "./avl.data.provider";

export class Data {
    avl_raw_data: AVLData[] = [];
    constructor(
        packet_reader: PacketReader<number>,
        on_oiElement_error: (e) => void,
        codec: number,
        quantity: number
    ) {
        for (let i = 0; i < quantity; i++) {
            let alv_data = new AVLData(packet_reader, on_oiElement_error, codec);
            this.avl_raw_data.push(alv_data);
        }
    }
}