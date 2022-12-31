/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import TestCounter from "../utils/TestCounter.json";
import { CounterAddress } from "../../config2";

const GetCount = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [count, setCount] = useState();
  useEffect(() => {
    sendTxToBlockchain()
   }, []);
 
 console.log("Connected to contract", CounterAddress);

 const rpcUrl = "https://matic-mumbai.chainstacklabs.com";
 // const rpcUrl = "http://localhost:8545";

  const sendTxToBlockchain = async () => {
    try {
      // setTxStatus("Sending mint transaction to Polygon Mumbai Blockchain.");
      //const web3Modal = new Web3Modal();
      //const connection = await web3Modal.connect();
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      console.log("Provider is ", provider);
      const Contract = new ethers.Contract(CounterAddress, TestCounter.abi, provider);
      console.log("contract is", Contract);
      console.log("Connected to smart contract", CounterAddress);

      const mintNFTTx = await Contract.getCount();
      console.log("Counter HEX value is", mintNFTTx);
      console.log("Counter STRING  value is", mintNFTTx.toString());
      // const parsed = parseInt(mintNFTTx, 16);
      const parsed =mintNFTTx.toString();
      console.log("Counter DECIMAL value is", parsed); 
      setCount(parsed);
      console.log("New count successfully retrieved from Blockchain");
      return parsed;
    } catch (error) {
      setErrorMessage("Failed to connect to Polygon Mumbai.");
      console.log(error);
    }
  };


  return (
    <>
      <div className="text-4xl text-center text-black font-bold mt-5">
        <br />
        <h1> No of views :  {count}</h1>
      </div>

    </>

  );
};
export default GetCount;
