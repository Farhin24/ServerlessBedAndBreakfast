//reference - https://www.geeksforgeeks.org/transforming-a-plain-text-message-to-cipher-text/
//https://blog.cloudboost.io/create-your-own-cipher-using-javascript-cac216d3d2c

export const decryptCipher = (encryptedCipher, randomKey) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var decryptedCipher = "";
  for (var i = 0; i < encryptedCipher.length; ++i) {
    var index = alphabets.indexOf(encryptedCipher[i]) - randomKey;
    if (index < 0) {
      index = index + 26;
    }
    decryptedCipher = decryptedCipher + alphabets[index];
  }
  return decryptedCipher;
};

export const generateEncryptedCipher = () => {
  const charString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 1;
  var result = "";
  for (var i = length; i > 0; --i) {
    result += charString[Math.floor(Math.random() * charString.length)];
  }
  return result;
};
