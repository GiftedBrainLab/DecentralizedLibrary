const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const EbookFactory = await hre.ethers.getContractFactory("Ebook");
  const ebookContract = await EbookFactory.deploy();
  await ebookContract.deployed();
  console.log("Ebook contract deployed to:", ebookContract.address);

  const VideobookFactory = await hre.ethers.getContractFactory("VideoBook");
  const videobookContract = await VideobookFactory.deploy();
  await videobookContract .deployed();
  console.log("VideoBook contract deployed to:", videobookContract .address);

  const ProfileFactory = await hre.ethers.getContractFactory("Profile");
  const profileContract = await ProfileFactory.deploy();
  await profileContract.deployed();
  console.log("Profile contract deployed to : ", profileContract.address);

  fs.writeFileSync('./config.js', `
  export const EbookAddress = "${ebookContract.address}"
  export const VideoBookAddress = "${videobookContract .address}"
  export const ProfileAddress= "${profileContract.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
