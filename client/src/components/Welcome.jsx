import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
// import logo1 from "../assets/logowhite2.png";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];

const MAINNET_RPC_URL = "https://polygon-mainnet.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V";
const MUMBAI_RPC_URL = "https://polygon-mumbai.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V";
const RINKEBY_RPC_URL = "https://eth-rinkeby.alchemyapi.io/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V";

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x137", // chain ID must be in hexadecimel
      token: "MATIC",
      namespace: "evm",
      label: "Polygon Mainnet",
      rpcUrl: MAINNET_RPC_URL
    },
    {
      id: "0x80001",
      token: "Matic",
      namespace: "evm",
      label: "Mumbai Testnet",
      rpcUrl: MUMBAI_RPC_URL
    },
    {
      id: "0x4",
      token: "rETH",
      namespace: "evm",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: RINKEBY_RPC_URL
    }
  ],
  appMetadata: {
    name: "DecentralizedLibrary",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    description: "Web3 Decentralized Library",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});

const Welcome = () => {
  // eslint-disable-next-line no-unused-vars
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  const [account, setAccount] = useState();

  const connectWallet2 = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts, } = wallets[0];
      setAccount(accounts[0].address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Decentralized <br /> Library <br />
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Read, Learn and Earn
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet2}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-80 sm:w-120 w-3/4 my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={61} color="#000" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-xl">
                  <div className="App">
                    <div>Wallet Address: <br /> {account}</div>
                  </div>
                  {shortenAddress(currentAccount)}
                </p>
                <br />
                <p className="text-white font-semibold text-2xl mt-1">
                  Polygon Address of Library User
                </p>

              </div>
            </div>
          </div>

        </div>

        <div className="md:flex-[0.5] flex-initial justify-center items-center mt-50">
          <a target="_blank" href="https://staging-global.transak.com/?apiKey=b2499ea6-aafd-4737-9c55-42c0501e8331" rel="noreferrer">
            <button className="flex flex-row h-20 text-2xl pl-10 pr-10 justify-center items-center my-5 bg-[#ffffff] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]" type="button">Buy Crypto with local currency</button>

          </a>
          {/** <img src={logo1} alt="welcome" className="w-100 cursor-pointer mt-10 pt-20" /> * */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
