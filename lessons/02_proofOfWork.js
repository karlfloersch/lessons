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
  data: 'Hello world!',
  nonce: 0
}
function mineBlock (blockData, difficulty, maxAttempts) {
  for (let i = 0; i < maxAttempts; i++) {
    let blockAttempt = Object.assign({'nonce': i}, blockData)
    const blockhash = sha3(blockAttempt)
    // Check number of zeros, eg. for difficulty 3 we need 0x000abc123...
    if (parseInt(blockhash.substring(0, 2 + difficulty)) === 0) {
      return blockAttempt
    }
  }
  return 'FAIL'
}
const block2Unmined = {
  prevhash: sha3(genesisBlock),
  data: 'I am second block!'
}
const block2 = mineBlock(block2Unmined, 2, 10000)
const block3Unmined = {
  prevhash: sha3(block2),
  data: 'I am a third block!'
}
const block3 = mineBlock(block3Unmined, 2, 10000)
const block4Unmined = {
  prevhash: sha3(block3),
  data: 'I am a forth block!'
}
const block4 = mineBlock(block4Unmined, 2, 10000)

// Add the blocks
addBlock(blockchain, genesisBlock)
addBlock(blockchain, block2)
addBlock(blockchain, block3)
addBlock(blockchain, block4)

// Print everything!
console.log(blockchain)
