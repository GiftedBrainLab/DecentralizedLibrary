/* pages/ebook/csbooks.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../components";

import { EbookAddress } from "../../../config";
import Ebook from "../../utils/Ebook.json";

export default function CSBook() {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadBooks();
  }, []);
  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  const rpcUrl = "https://matic-mumbai.chainstacklabs.com";
  // const rpcUrl = "http://localhost:8545";

  async function loadBooks() {
    /* create a generic provider and query for ebooks */
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(EbookAddress, Ebook.abi, provider);
    const data = await contract.fetchAllLibraryItems();
    console.log("book data fetched from contract", data);
    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    // eslint-disable-next-line arrow-parens
    const items = await Promise.all(data.map(async i => {
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
        author: meta.data.properties.author,
        pages: meta.data.properties.pages,
      };
      console.log("item returned is ", item);
      return item;
    }));
    setNfts(items);
    setLoadingState("loaded");
  }
  async function readBook(nft) {
    console.log("item id clicked is", nft.tokenId);
    const id = nft.tokenId;
    navigate("/reading", {
      state: {
        query: id,
        query2: { id },
      }
    });

    console.log("Prop result without {} is ", id);
    console.log("Prop result with {} is ", { id });
  }

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div>
        <Navbar />
        <h1 className="px-20 py-10 text-3xl">No book in this book section</h1>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <h1 className="px-20 mb-14 text-3xl">Available books</h1>
      <div className="flex justify-center sm:mt-32 mt-20 bg-gray-500 mb-12">

        <div className="px-4" style={{ maxWidth: "1600px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {nfts.map((nft, i) => (

              <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
                <iframe
                  title="Ebook"
                  height="400px"
                  width="100%"
                  src={`${nft.image}#toolbar=0`}
                  className="py-3 object-fill"
                />
                <div className="p-2">
                  <p style={{ height: "64px" }} className="text-xl text-red-500 font-semibold">Title: {nft.name}</p>
                  <p style={{ height: "44px" }} className="text-xl font-semibold">Author(s):{nft.author}</p>
                  <div style={{ height: "70px", overflow: "hidden" }}>
                    <p className="text-gray-700">Description: {nft.description}</p>
                  </div>
                  <p className="text-xl font-bold text-white">{nft.pages} Pages</p>
                </div>
                <div className="p-2 bg-black">

                  <button type="button" className="mt-4 w-full bg-red-500 text-white font-bold py-2 px-12 rounded" onClick={() => readBook(nft)}>Read</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
