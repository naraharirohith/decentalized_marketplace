
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// SPDX-License-Identifier: MIT

const { ethers } = require('ethers');

const Marketplace = artifacts.require('Marketplace');

async function deployContract() {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  const signer = provider.getSigner();

  const marketplace = await Marketplace.new({ from: await signer.getAddress() });

  console.log('Marketplace deployed to address:', marketplace.address);
}

deployContract();
