const { ethers } = require('ethers');

const Marketplace = artifacts.require('Marketplace');
const data = require('./items.json');

async function deployContract() {
    
    // Mumbai
    const marketplaceAddress = "0x9A8F9a1f0A17343c086b94daeF41f8b9615F2728"
    
    // console.log(data);
    for(let i =0; i<9; i++) {
        console.log(data.items[i]);
    }
    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
    const signer = provider.getSigner();
  
    const marketplace = new ethers.Contract(marketplaceAddress, Marketplace, provider);

  }
  
  deployContract();