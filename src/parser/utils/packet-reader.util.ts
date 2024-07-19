export class PacketReader<T> {
    content: string;
    index: number;
    unitSize: number;
    converter: (x: string) => T;
    indexEnd: number;
    constructor(
        content: string,
        unitSize: number,
        converter: (x: string) => T
    ) {
        if(!content) throw new Error('content is required');
        if(typeof(content) !== 'string') throw new Error('content must be a string');

        this.content = content;
        this.index = 0;
        this.unitSize = unitSize;
        this.converter = converter;
        this.indexEnd = content.length;
    }

    read(length : number) {
        this._validateLength(length);
        const to_read = length * this.unitSize;
        const value = this.content.substring(this.index, this.index + to_read);
        this.index += to_read;
        return this.converter(value);
    }

    readEnd(length: number): T {
        this._validateLength(length);
        const toRead = length * this.unitSize;
        const value = this.content.substring(this.indexEnd - toRead, this.indexEnd);
        this.indexEnd -= toRead;
        return this.converter(value);
    }

    remainingContent() {
        return this.content.substring(this.index, this.indexEnd);
    }

    _validateLength(length: number): void {
        if(length < 0) throw new Error('Length must be greater than 0');
        if(length > (this.indexEnd - this.index)) throw new Error('End of content');
        if(this.index >= this.indexEnd) throw new Error('End of content');
    }

}