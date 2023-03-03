const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xa8e74d5a5fa82e001427df7a6f75321800aaaf7f": 100,
  "0xe6e490734d59b475597bfe9a9ff966427587b014": 50,
  "0xac75b25baee72dd852993f587de0f44dbac6c623": 75,
};

/**
 * Get: returns the balance of an address.
 */
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

/**
 * Post: transfer tokens to another account.
 */
app.post("/send", (req, res) => {
  const { sender, amount, signedMessage, recipient } = req.body;
  const { message, signature, recoveryBit } = signedMessage;

  // Verify the signedMessage was from sender before going any further.
  if (!validateSignature(sender, message, signature, recoveryBit)) {
    res.status(400).send({ message: "Could not verify the signed message" });
    return;
  };

  // Initialise balances if they don't exist yet.
  setInitialBalance(sender);
  setInitialBalance(recipient);

  // Throw an error if the sender doesn't have enough funds.
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

// Start the server.
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

/**
 * Set a balance for an unknown address.
 * 
 * @param {} address 
 */
function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

/**
 * Verify that the signature is from the sender.
 */
async function validateSignature(sender, message, signature, recoveryBit) {
  const address = await recoverAddressFromSignature(message, signature, recoveryBit);
  if (address !== sender) {
    console.log('The signed transaction was invalid');
    return false;
  }
  else {
    console.log('The signed transaction was valid.');
    return true;
  } 
}

/**
 * Recover the public key from a ECDSA signed message.
 * 
 * @param {} message 
 * @param {*} signature 
 * @param {*} recoveryBit 
 * @returns 
 */
async function recoverAddressFromSignature(message, signature, recoveryBit) {
  const publicKey = secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);
  const address = '0x' + toHex(keccak256(publicKey).slice(-20));
  return address;
}

/**
 * Keccak256 hash a string.
 * 
 * @param {*} msg 
 * @returns 
 */
const hashMessage = (msg) => {
  const bytes = utf8ToBytes(msg);
  return keccak256(bytes);
}


