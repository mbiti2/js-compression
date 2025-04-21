# JS Compressor

A command-line compression tool implementing RLE and LZ77 algorithms in JavaScript.

## Installation

```bash
npm install
chmod +x index.js
```

## Usage

```bash
# Compress using RLE
./index.js compress input.txt compressed.rle --rle

# Decompress using RLE
./index.js decompress compressed.rle output.txt --rle

# Compress using LZ77
./index.js compress input.txt compressed.lz --lz

# Decompress using LZ77
./index.js decompress compressed.lz output.txt --lz
```

## Docker Usage

```bash
# Build the image
docker build -t js-compressor .

# Run compression
docker run -v $(pwd):/data js-compressor compress /data/input.txt /data/output.rle --rle
```

## Testing

```bash
npm test
```
