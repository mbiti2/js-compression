import assert from 'assert';
import { compress, decompress } from '../rle.js';

describe('RLE Compression', () => {
    it('should compress and decompress correctly', () => {
        const input = Buffer.from('AAABBBCCCCCDDDDE');
        const compressed = compress(input);
        const decompressed = decompress(compressed);
        assert.strictEqual(decompressed.toString(), input.toString());
    });
});