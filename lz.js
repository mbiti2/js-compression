// lz.js

export function compress(input) {
    const windowSize = 255;
    const inputStr = input.toString(); // assume UTF-8 compatible
    const output = [];
  
    let pos = 0;
    while (pos < inputStr.length) {
      let matchLength = 0;
      let matchOffset = 0;
  
      const end = Math.min(pos + 255, inputStr.length);
  
      for (let i = Math.max(0, pos - windowSize); i < pos; i++) {
        let length = 0;
        while (
          length < 255 &&
          inputStr[i + length] === inputStr[pos + length] &&
          pos + length < inputStr.length
        ) {
          length++;
        }
        if (length > matchLength) {
          matchLength = length;
          matchOffset = pos - i;
        }
      }
  
      const nextChar = inputStr[pos + matchLength] || '';
  
      output.push(matchOffset);
      output.push(matchLength);
      output.push(nextChar.charCodeAt(0) || 0); // store as char code
  
      pos += matchLength + 1;
    }
  
    return Buffer.from(output);
  }
  
  export function decompress(buffer) {
    const output = [];
    const bytes = [...buffer];
    let i = 0;
  
    while (i < bytes.length) {
      const offset = bytes[i++];
      const length = bytes[i++];
      const charCode = bytes[i++];
      const currentLen = output.length;
  
      for (let j = 0; j < length; j++) {
        output.push(output[currentLen - offset + j]);
      }
  
      if (charCode !== 0) {
        output.push(String.fromCharCode(charCode));
      }
    }
  
    return Buffer.from(output.join(''));
  }
  
  