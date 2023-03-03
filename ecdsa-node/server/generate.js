const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();

console.log('private key: ', toHex(privateKey));

const publicKey  = secp.getPublicKey(privateKey);

console.log('public key: ', toHex(publicKey));

const address = '0x' + toHex(keccak256(publicKey).slice(-20));

console.log('address: ', address);
