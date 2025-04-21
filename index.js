#!/usr/bin/env node

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { compress as compressRLE, decompress as decompressRLE } from './rle.js';
import { compress as compressLZ, decompress as decompressLZ } from './lz.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function printUsage() {
    console.log('Usage: compress|decompress <input_file> <output_file> --rle|--lz');
    console.log('Options:');
    console.log('  --rle    Use Run-Length Encoding');
    console.log('  --lz     Use LZ77 compression');
    process.exit(1);
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length !== 4) {
        printUsage();
    }

    const [command, inputFile, outputFile, algorithm] = args;

    if (!['compress', 'decompress'].includes(command)) {
        console.error('Error: First argument must be either "compress" or "decompress"');
        printUsage();
    }

    if (!fs.existsSync(inputFile)) {
        console.error(`Error: Input file '${inputFile}' does not exist`);
        process.exit(1);
    }

    if (!['-rle', '--rle', '-lz', '--lz'].includes(algorithm)) {
        console.error('Error: Invalid algorithm specified');
        printUsage();
    }

    const input = fs.readFileSync(inputFile);
    let result;

    const isRLE = algorithm === '--rle' || algorithm === '-rle';
    
    try {
        if (command === 'compress') {
            result = isRLE ? compressRLE(input) : compressLZ(input);
        } else {
            result = isRLE ? decompressRLE(input) : decompressLZ(input);
        }

        fs.writeFileSync(outputFile, result);
        console.log(`Successfully ${command}ed ${inputFile} to ${outputFile}`);
    } catch (error) {
        console.error(`Error: Failed to ${command} file:`, error.message);
        process.exit(1);
    }
}

main();