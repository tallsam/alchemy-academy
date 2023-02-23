const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "040103aa7e2ed61bc2b5ca507697f5e2261c0ef570df9e3d908bb54b0fa0e3ab3691fc7ed516ed4e39b37583000c2c198dc134a1a1c898b1d3b5bb7b9a7eea3782 ": 100,
  "049f195d49129f3030f0c6e2d53e7da5b5532c8b1325c55df39d2afe826bb8e186dfbef51afac0a86cb74927b32a00e3c687a9a1b7fd518edd4b309d2d4e5c9844": 50,
  "0425c58e45865ee2607a62a098e0b92928897b178910b7c4d7e0e42db313e27be393763fcec2af8c12796e7fe40ed9603ed3ed8bed065ff74201dfd448d54f70b6": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
