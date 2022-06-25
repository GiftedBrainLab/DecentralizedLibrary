/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import NFTMarketplace from "../utils/Profile.json";
import { EbookAddress } from "../../config";

// eslint-disable-next-line max-len
const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4Zjc4ODAwMkUzZDAwNEIxMDI3NTFGMUQ0OTJlNmI1NjNFODE3NmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzA1NjE4NzM4MCwibmFtZSI6InBlbnNpb25maSJ9.agI-2V-FeK_eVRAZ-T6KGGfE9ltWrTUQ7brFzzYVwdM";

const MintProfile = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "", description: "" });

  const handleFileUpload = (event) => {
    console.log("file is uploaded");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const uploadNFTContent = async (inputFile) => {
    const { name, description } = formInput;
    if (!name || !description || !inputFile) return;
    const nftStorage = new NFTStorage({ token: APIKEY, });
    try {
      setTxStatus("Uploading NFT to IPFS & Filecoin via NFT.storage.");
      const metaData = await nftStorage.store({
        name, // "PensionFi Profile NFT",
        description, // "This is PensionFi user profile Registration.",
        image: inputFile
      });
      setMetaDataURl(getIPFSGatewayURL(metaData.url));
      console.log("metadata url: ", { metaData });
      return metaData;
    } catch (error) {
      setErrorMessage("Could not save NFT to NFT.Storage - Aborted minting.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus("Sending mint transaction to Polygon Mumbai Blockchain.");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const connectedContract = new ethers.Contract(EbookAddress, NFTMarketplace.abi, provider.getSigner());
      const mintNFTTx = await connectedContract.createToken(metadata.url);
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://mumbai.polygonscan.com/tx/${mintNFTTx.hash}`);
    setTxStatus("Ebook item created successfully!");
  };

  const mintNFTToken = async (event, uploadedFile) => {
    event.preventDefault();
    // 1. upload NFT content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Harmony
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
    previewNFT(metaData, mintNFTTx);
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  return (
    <>
      <div className="text-4xl text-center text-white font-bold mt-10 mb-20">
        <h1> Profile Creation Page </h1>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12 ">
          <input
            placeholder="Profile username (Not your real name)"
            className="mt-8 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <input
            placeholder="Profile Quote (Write your favourite quote)"
            className="mt-8 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <br />

          <div className="MintNFT">
            <form>
              <h3>Create your Profile NFT on Polygon Mumbai & Filecoin/IPFS</h3>
              <br />
              <input type="file" onChange={handleFileUpload} />
              <br />
            </form>
            <br />
            {txStatus && <p>{txStatus}</p>}
            <br />
            {imageView && <img className="NFTImg" src={imageView} alt="NFT preview" />}
            <br />
            {metaDataURL && <p><a href={metaDataURL}>Metadata on IPFS</a></p>}
            <br />
            {txURL && <p><a href={txURL}>See the mint transaction</a></p>}
            <br />
            {errorMessage}
          </div>

          <button type="button" onClick={(e) => mintNFTToken(e, uploadedFile)} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
            Create Profile
          </button>
        </div>
      </div>
    </>

  );
};
export default MintProfile;
