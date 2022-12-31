/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import TestCounter from "../utils/TestCounter.json";
import { CounterAddress } from "../../config2";

const AddCount = () => {
  //const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const sendTxToBlockchain = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(CounterAddress, TestCounter.abi, signer);
      console.log("Connected to contract for AddCount", CounterAddress);
      console.log("Connected to contract for AddCount", connectedContract);
      
      const transaction = await connectedContract.increment13();
      console.log("New count successfully created and sent to Blockchain");
      await transaction.wait();
      return  transaction;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }

  };

  return (
    <>
      <div className="text-4xl text-center text-black font-bold mt-10">
        <br /> <br /><br />
        <h1> No of view :  {sendTxToBlockchain()}</h1>
      </div>

    </>

  );
 
};
export default AddCount;
