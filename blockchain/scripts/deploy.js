const { ethers } = require("hardhat");

require("dotenv").config();

async function main() {
  const deployer = new ethers.Wallet(process.env.PK);
  const CopyRight = await ethers.deployContract("CopyRight");

  await CopyRight.waitForDeployment();
  console.log("CopyRight contract deployed to:", await CopyRight.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
