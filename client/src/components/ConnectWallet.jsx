/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";
import UAuth from "@uauth/js";

const truncateAddress = (address) => `${address.slice(0, 8)}...${address.slice(-4)}`;

const uauth = new UAuth({
  clientID: "58971f20-5524-49c9-b021-72c37275da1a",
  redirectUri:
    process.env.NODE_ENV === "production"
      ? "https://decentralized-library.vercel.app/"
      : "http://localhost:3000",
});

const ConnectWallet = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [address, setAddress] = useState();

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    if (!address) {
      const { ethereum } = window;
      try {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const connectUnstoppable = async () => {
    try {
      const authorization = await uauth.loginWithPopup();

      if (authorization.idToken.wallet_address) {
        setAddress(authorization.idToken.wallet_address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    uauth
      .logout()
      .then(() => {
        setAddress(null);
      })
      .catch((error) => {
        console.error("profile error:", error);
      });
  };

  return (
    <div className="bg-white-100 ">
      {address && (
        <Blockies
          className="rounded-full"
          seed={address.toLowerCase()}
          size={1}
          scale={1}
        />
      )}
      {address ? (
        <>
          <div className="">

            {truncateAddress(address)}

          </div>
          <div>
            <button
              type="button"
              className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="space-x-1 text-sm sm:text-base sm:space-x-3">
          <button
            type="button"
            className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange "
            onClick={connectUnstoppable}
          >
            Login with Unstoppable
          </button>
          <button
            type="button"
            className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange"
            onClick={connectWallet}
          >
            {haveMetamask ? "Connect Wallet" : "Install metamask"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
