const SHA256 = require('crypto-js/sha256')

class Block {
    constructor (index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){ 
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];

    }
    createGenesisBlock(){
        return new Block(0,"01/01/2018","Genesis Block","0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        // Normally you'd have other checks here.
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i=1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            
        }
        return true;
    }
}

let zacCoin = new Blockchain();
zacCoin.addBlock(new Block(1,"03/27/2018", {amount: 4}));
zacCoin.addBlock(new Block(2,"03/28/2018", {amount: 6}));

console.log("Is blockchain valid? " + zacCoin.isChainValid());

zacCoin.chain[1].data = {amount: 12};
zacCoin.chain[1].hash = zacCoin.chain[1].calculateHash();

console.log("Is blockchain valid? " + zacCoin.isChainValid());


//console.log(JSON.stringify(zacCoin, null, 4));
