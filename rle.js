// rle.js

// Compress function
export const compress = (input) => {
    const string = input.toString(); // convert Buffer to string
    let result = '';
    let count = 1;
  
    for (let i = 0; i < string.length; i++) {
      let j = i + 1;
      while (string[i] === string[j]) {
        count++;
        if (count === 9) {
          j++;
          break;
        } else {
          j++;
        }
      }
      result += `${count}${string[i]}`;
      count = 1;
      i = j - 1;
    }
  
    return result;
  };
  
  // Decompress function
  export const decompress = (encoded) => {
    let result = '';
  
    for (let i = 0; i < encoded.length; i += 2) {
      const count = parseInt(encoded[i], 10);
      const char = encoded[i + 1];
      result += char.repeat(count);
    }
  
    return Buffer.from(result); // return as Buffer
  };
  