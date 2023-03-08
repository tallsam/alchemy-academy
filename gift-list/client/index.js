const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  // Create a proof!
  
  let tree = new MerkleTree(niceList);
  let leaf = 'Yeehah';
  let index = 0;
  let proof = tree.getProof(index);

  // send it to the server!
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    leaf: leaf
  });

  console.log({ gift });
}

main();