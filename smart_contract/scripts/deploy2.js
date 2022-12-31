const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const CounterFactory = await hre.ethers.getContractFactory("TestCounter");
  const counterContract = await CounterFactory.deploy();
  await counterContract.deployed();
  console.log("Countercontract deployed to:", counterContract.address);

  fs.writeFileSync('../client/config2.js', `
  export const CounterAddress = "${counterContract.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
