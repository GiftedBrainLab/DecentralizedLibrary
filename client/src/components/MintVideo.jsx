/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import Web3Modal from "web3modal";
import VideoBook from "../utils/VideoBook.json";
import { VideoBookAddress } from "../../config";

// eslint-disable-next-line max-len
const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4Zjc4ODAwMkUzZDAwNEIxMDI3NTFGMUQ0OTJlNmI1NjNFODE3NmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzA1NjE4NzM4MCwibmFtZSI6InBlbnNpb25maSJ9.agI-2V-FeK_eVRAZ-T6KGGfE9ltWrTUQ7brFzzYVwdM";

/** rewrite ipfs:// uri to dweb.link gateway URLs
function makeGatewayURL(ipfsURI) {
  return ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
}
 */

const MintVideoBook = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "", description: "", creator: "", time: "", category: "1" });

  const handleFileUpload = (event) => {
    console.log("file is uploaded");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const uploadNFTContent = async (inputFile) => {
    const { name, description, creator, time, category } = formInput;
    if (!name || !description || !creator || !time || !category || !inputFile) return;
    const nftStorage = new NFTStorage({ token: APIKEY, });
    try {
      console.log("Trying to upload asset to ipfs");
      setTxStatus("Uploading Item to IPFS & Filecoin via NFT.storage.");
      const metaData = await nftStorage.store({
        name, // "Title of video",
        description, // "Description of video.",
        image: inputFile, // asset to be uploaded
        properties: {
          creator, // Video creator
          time, // Total time of video
          category // category of Vbook
        },
      });
      setMetaDataURl(metaData.url);
      console.log("metadata is: ", { metaData });
      return metaData;
    } catch (error) {
      setErrorMessage("Could not save NFT to NFT.Storage - Aborted minting Vbook.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus("Sending mint transaction to Polygon Mumbai Blockchain.");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const category = formInput.category.toString();
      console.log("Video category is ", category);
      const connectedContract = new ethers.Contract(VideoBookAddress, VideoBook.abi, provider.getSigner());
      console.log("Connected to contract", VideoBookAddress);
      console.log("IPFS blockchain uri is ", metadata.url);

      const mintNFTTx = await connectedContract.createVideo(metadata.url, category);
      console.log("New book successfully created and sent to Blockchain");
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    console.log("image ipfs path is", imgViewString);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://mumbai.polygonscan.com/tx/${mintNFTTx.hash}`);
    setTxStatus("Video book created successfully!");
    console.log("Preview details completed");
  };

  const mintNFTToken = async (e, uploadedFile) => {
    e.preventDefault();
    // 1. upload NFT content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Polygon
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
    previewNFT(metaData, mintNFTTx);

    navigate("/csvideos");
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    // console.log("urlArray = ", urlArray);
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    // console.log("ipfsGateWayURL = ", ipfsGateWayURL);
    return ipfsGateWayURL;
  };

  return (
    <>
      <div className="text-4xl text-center text-black font-bold mt-10">
        <br /> <br /><br />
        <h1> Create VideoBook Item </h1>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12 ">
          <input
            placeholder="Video Title "
            className="mt-5 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <input
            placeholder="Video Description"
            className="mt-5 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <input
            placeholder="Creator(s)"
            className="mt-5 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, creator: e.target.value })}
          />
          <select
            className="mt-5 border rounded p-4"
            // value={this.state.value}
            onChange={(e) => updateFormInput({ ...formInput, category: e.target.value })}
          ><option value="1">Computer Science</option>
            <option value="2">Mathematics</option>
            <option value="3">Engineering</option>
            <option value="4">Physics</option>
            <option value="5">General category</option>
          </select>

          <input
            placeholder="Total Video Time"
            className="mt-5 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, time: e.target.value })}
          />
          <br />

          <div className="MintNFT">
            <form>
              <h3>Create your VideoBook on Polygon Mumbai Blockchain & stored on IPFS / Filecoin</h3>
              <br />
              <input type="file" onChange={handleFileUpload} />
              <br />
            </form>
            <br />
            {txStatus && <p>{txStatus}</p>}
            <br />
            {metaDataURL && <p><a href={metaDataURL}>Metadata on IPFS</a></p>}
            <br />
            {txURL && <p><a href={txURL}>See the mint transaction</a></p>}
            <br />
            {errorMessage}

            <br />
            {imageView && (
            <iframe
              className="mb-10"
              title="VideoBook "
              src={imageView}
              alt="NFT preview"
              frameBorder="0"
              scrolling="auto"
              height="50%"
              width="100%"
            />
            )}

          </div>

          <button type="button" onClick={(e) => mintNFTToken(e, uploadedFile)} className="font-bold mt-20 bg-blue-800 text-white-500 text-2xl rounded p-4 shadow-lg">
            Create Item
          </button>
        </div>
      </div>
    </>

  );
};
export default MintVideoBook;
