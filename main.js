const SHA256 = require('crypto-js/sha256')

class Block {
    construtor (index, timestamp, data, previousHash = '') {
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
        return new Block("0","01/01/2018",{description: "Genesis Block"},0);
    }
    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLastestBlock().hash;
        console.log("Just added hash " + newBlock.previousHash);
        newBlock.hash = newBlock.calculateHash();

        // Normally you'd have other checks here.
        this.chain.push(newBlock);
    }
}

let zacCoin = new Blockchain();
zacCoin.addBlock(new Block(1,"03/26/2018",{amount: 4}));
zacCoin.addBlock(new Block(2,"03/27/2018",{amount: 6}));

console.log(JSON.stringify(zacCoin, null, 4));
