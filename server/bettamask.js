/* Sign messages with a wallet better than metamask!! */

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, bytesToHex } = require("ethereum-cryptography/utils");

/**
 * private key:  160b61f238cf45c182b683a012864079b3a0c2c72b4c21ae62acc9ef335351e8
 * public key:  04e887c5de34ff174bb688942feea3119ff1c20202ba904ee95145e527a28cb18d38c5ff8fad4bee413ceb1a4a3f45c9a7955370fe6f8e4415e3095a5e057eca83
 * address:  0xcb15fa2b363067e145748dd3a28eec626cadad2b
 */

const PRIVATE_KEY = '160b61f238cf45c182b683a012864079b3a0c2c72b4c21ae62acc9ef335351e8';

async function signMessage(msg) {
    const hashedMsg = hashMessage(msg);
    return secp.sign(hashedMsg, PRIVATE_KEY, {recovered: true});
}

const hashMessage = (msg) => {
    const bytes = utf8ToBytes(msg);
    return keccak256(bytes);
}

const recoverKey = (msg, sig, recoveryBit) => {
    return secp.recoverPublicKey(hashMessage(msg), sig, recoveryBit);
}

console.log('Message: ', process.argv[2]);

signMessage(process.argv[2]).then((signed) => {
    console.log('Signature: ' + bytesToHex(signed[0]));
})
