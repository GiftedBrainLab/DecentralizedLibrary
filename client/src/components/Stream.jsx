import { useEffect, useRef } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import "./Stream.css";
import { Client } from "@livepeer/webrtmp-sdk";
import GetCount from "./GetCount";
import AddCount from "./AddCount";

import TestCounter from "../utils/TestCounter.json";
import { CounterAddress } from "../../config2";

function Stream() {
  // const inputEl = useRef(null);
  const videoEl = useRef(null);
  const stream = useRef(null);

  useEffect(() => {
    (async () => {
      videoEl.current.volume = 0;

      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })(); 
  });
const count = async () => {
  try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(CounterAddress, TestCounter.abi, signer);
      console.log("Connected to contract for AddCount", CounterAddress);
      console.log("Connected to contract for AddCount", connectedContract);
      
      const transaction = await connectedContract.incrementCounter();
      //const transaction = await connectedContract.increment177();
      console.log("New count successfully created and sent to Blockchain");
      await transaction.wait();
      return  transaction;
    } catch (error) {
      console.log(error);
    }

}

  const onButtonClick = async () => {

    await count()
    // const streamKey = inputEl.current.value;
    const streamKey = "eb3e-wm1w-ehyk-uk5b";

    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; click on Watch-Live-Stream to view or visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });
  };

  return (
    <div className="App mb-14 mt-1">
<div className = "text-center text-3xl text-black-600"><GetCount /> </div>
      <video className="App-video" ref={videoEl}>
        <track
          default
          kind="captions"
          srcLang="en"
          src="/media/examples/friday.vtt"
        />
      </video>
      <button type="button" className="App-button" onClick={onButtonClick}>
        Start Live Streaming
      </button>
      {/**
      <button type="button" className="App-button" onClick={count}>
        Stop Streaming
      </button>
       */}    
    </div>
  );
}

export default Stream;
