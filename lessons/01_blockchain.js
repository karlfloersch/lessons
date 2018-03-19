let sha3 = require('solidity-sha3').default

// Our blockchain and a helper function letting us add blocks
// Blockchain is a mapping of blockhash -> block
let blockchain = {}
function addBlock (blockchain, block) {
  blockchain[sha3(block)] = block
}

// Some blocks
const genesisBlock = {
  prevhash: 'GENESIS',
  data: 'Hello world!'
}
const block2 = {
  prevhash: sha3(genesisBlock),
  data: 'I am second block!'
}
const block3 = {
  prevhash: sha3(block2),
  data: 'I am a third block!'
}

// Add the blocks
addBlock(blockchain, genesisBlock)
addBlock(blockchain, block2)
addBlock(blockchain, block3)

// Print everything!
console.log(blockchain)
