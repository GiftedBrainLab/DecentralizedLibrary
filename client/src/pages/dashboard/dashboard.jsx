/* eslint-disable no-use-before-define */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

// import {marketplaceAddress } from "../../../config";

// import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(1, 1, signer);
    const data = await contract.fetchItemsListed();

    const items = await Promise.all(data.map(async (i) => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
      const item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      };
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>);
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Listed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <iframe title="1" src={nft.image} alt={nft.name}> </iframe>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} MATIC</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
