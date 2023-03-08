const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');


const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '18429b8a27ef87c755bc8f15c43b27931878edf19d006758e44b6f1f906b108e';

console.log(MERKLE_ROOT);

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const leaf = req.leaf;

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(body.proof, body.leaf, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
