import { Body, Controller, Post, Res } from "@nestjs/common";
import { ParserService } from "./parser.service";
import { Response } from "express";
import * as net from 'net';
import { parseIMEI } from "./utils/parseImei.util";

@Controller('parser')
export class ParserController {
    private server: net.Server;
    private imei_number: string = "350317179582410";
    constructor(
        private readonly parserService: ParserService
    ) { 
        this.server = net.createServer(this.handleConnection.bind(this));
        this.server.listen(7001, () => {
            console.log('Server is listening on port 7001');
        })
    }

    private handleConnection(socket: net.Socket): void {
        socket.on('data', async (data: Buffer) => {
            try {
                const packet = data.toString('hex');
                const messages = data.toString();
                if(messages.length < 35) { //** IMEI USE CASE */
                    console.log('IMEI USE CASE');
                    let raw_imei_parsed = packet.trim();
                    raw_imei_parsed = parseIMEI(raw_imei_parsed); 
                    console.log('IMEI PARSED:', raw_imei_parsed);
                    console.log('IMEI STORAG:', this.imei_number); 
                    this.imei_number = raw_imei_parsed;
                    if (raw_imei_parsed.toString() == this.imei_number) {
                        console.log('send 0x01')
                        const responseBuffer = Buffer.from([0x01]);
                        socket.write("0x01");
                        socket.write(responseBuffer);
                    } else {
                        console.log('send 0x00') 
                        const responseBuffer = Buffer.from([0x00]);
                        socket.write("0x00");
                        socket.write(responseBuffer);
                    }
                } else { //** AVL DATA USE CASE */
                    let packet = data.toString('hex');
                    packet = data.toString();
                    this.parserService.parseSendData(packet);
                }
            } catch (error) {
                console.log('error:', error);
            }
        });

        socket.on('close', () => {
            console.log('Connection closed');
        });

        socket.on('error', (error) => {
            console.log('error:', error);
        });
    }
}