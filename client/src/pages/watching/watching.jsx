import { React, useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import Web3Modal from "web3modal";
import { Navbar, Footer } from "../../components";

import { VideoBookAddress } from "../../../config";
import VideoBook from "../../utils/VideoBook.json";

export default function watchVideo() {
  const navigate = useNavigate();
  const location = useLocation();

  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadVideos();
  }, []);
  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  async function MoreVideos() {
    /* Link to Library Categories */
    // router.push("/catebooks");
    navigate("/catvideos");
  }

  // https://delibrary-quiz.4everland.app/
  // https://delibrary-quiz.on.fleek.co/
  const rpcUrl = "https://matic-mumbai.chainstacklabs.com";
  // const rpcUrl = "http://localhost:8545";

  const bookid = location.state.query;
  console.log("Bookid result is ", bookid);

  async function loadVideos() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(VideoBookAddress, VideoBook.abi, provider);
    const data = await contract.fetchOneNFT(bookid);
    console.log("book data fetched from contract");
    // console.log(provider.getCode(address));

    const items = await Promise.all(data.map(async (i) => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        creator: meta.data.properties.creator,
        time: meta.data.properties.time,
      };
      console.log("item returned is ", item);
      return item;
    }));
    setNfts(items);
    setLoadingState("loaded");
  }

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div>
        <Navbar />
        <h1 className="px-20 py-10 text-3xl">You have not selected any video to watch</h1>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <br />
        <div className="md:items-center mt-14">
          <center>

            <h2 className="mt-14 text-6xl font-bold leading-1 text-black-900 sm:text-5xl hover:opacity-25"> My Watching Tube</h2>

          </center>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4 mb-10">

          {
            nfts.map((nft, i) => (
              <div key={i} className="-bg-white border shadow rounded-xl overflow-hidden">
                <iframe
                  title="Ebook"
                  frameBorder="0"
                  scrolling="no"
                  height="450px"
                  width="100%"
                  src={`${nft.image}#toolbar=0`}
                  className="object-fill h-400 w-full"
                />
                <div className="p-4">
                  <p style={{ height: "20px" }} className="text-2xl font-semibold">{nft.name}</p>
                </div>
                <div className="p-4 bg-black">
                  <button type="button" className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded">
                    <a
                      className="social-icon-link github"
                      href="https://delibrary-quiz.4everland.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="quiz"
                    >Take a quiz and Earn an NFT
                    </a>
                  </button>
                </div>
                <div className="p-4 bg-black">
                  <button type="button" className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => MoreVideos()}>Watch more video books</button>
                </div>

              </div>
            ))
          }
        </div>

      </div>
      <Footer />
    </>
  );
}
