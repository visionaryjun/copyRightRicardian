const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const exp = require("constants");
const { sign } = require("crypto");
const { ethers, upgrades } = require("hardhat");
const { join } = require("path");

describe("CopyRight", function () {
  async function deployCopyRightFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const CopyRight = await ethers.getContractFactory("CopyRight");
    const copyRight = await CopyRight.deploy();
    return { copyRight, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the contract correctly", async function () {
      const { copyRight } = await loadFixture(deployCopyRightFixture);
      console.log(await copyRight.getAddress());
    });
  });

  describe("Register", function () {
    it("Should register a new contract correctly", async function () {
      const { copyRight, owner } = await loadFixture(deployCopyRightFixture);
      const name = "Author Name";
      const metadata = "data from http://example.com";
      const metadataString = JSON.stringify(metadata);
      const contents = ethers.toUtf8Bytes(metadataString);
      console.log("contrents >>", contents);
      const url = "http://example.com";
      const contentsHash = ethers.solidityPackedKeccak256(["string"],[metadataString]);
      console.log("contentsHash >>", contentsHash);

      await expect(copyRight.register(name, contents, url, contentsHash))
      .to.emit(copyRight, "Registerd")
      .withArgs(0, name, contents, url, contentsHash);
      
      const contractInfo = await copyRight.contractInfos(0);
      expect(contractInfo.author).to.equal(name);
      expect(ethers.hexlify(contractInfo.contents)).to.equal(ethers.hexlify(contents));
      expect(contractInfo.url).to.equal(url);
      expect(contractInfo.contentsHash).to.equal(contentsHash);
    });
  });
});
