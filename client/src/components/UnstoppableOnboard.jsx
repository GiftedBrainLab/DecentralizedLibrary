/* eslint-disable max-len */
//import {jsx, Button,} from 'theme-ui';
import React, { useState } from 'react';
import Blockies from "react-blockies";
import { rgba } from 'polished';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import injectedModule from '@web3-onboard/injected-wallets';
import Onboard from '@web3-onboard/core';
import UAuth from '@uauth/js'
import uauthBNCModule from '@uauth/web3-onboard'
import { useNavigate } from "react-router-dom";

const truncateAddress = (account) => `${account.slice(0, 8)}...${account.slice(-4)}`;
const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const MAINNET_RPC_URL = 'https://polygon-mainnet.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V';
const MUMBAI_RPC_URL = 'https://polygon-mumbai.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V';
const OPTIMISM_RPC_URL = 'https://opt-mainnet.g.alchemy.com/v2/4iPSn5hKKNYRUYWzxqskuLD9MR093pkg';

const uauth = new UAuth({
  clientID: "799e8827-4773-4b5d-b8bf-c48d7ff64fb6",
  redirectUri: "https://auto-recover.vercel.app/dashboard",
  scope: "openid wallet",
})

/*
const uauth = new UAuth({
  clientID: "799e8827-4773-4b5d-b8bf-c48d7ff64fb6",
  redirectUri: process.env.NODE_ENV === "production"
  ? "https://auto-recover.vercel.app/dashboard"
  : "http://127.0.0.1",
  scope: 'openid wallet',
})
*/

const uauthBNCOptions = {
  uauth: uauth,
  walletconnect: {
    infuraId: "https://polygon-mumbai.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V",
  },
}
const uauthModule = uauthBNCModule(uauthBNCOptions);
const modules = [uauthModule, coinbaseWalletSdk, walletConnect, injected];

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: '0x80001',
      token: 'Matic',
      namespace: 'evm',
      label: 'Mumbai Testnet',
      rpcUrl: MUMBAI_RPC_URL,
    },
    {
      id: '0x420',
      token: 'ETH',
      namespace: 'evm',
      label: 'Optimism Goerli',
      rpcUrl: OPTIMISM_RPC_URL,
    },
  ],
  appMetadata: {
    name: 'AutoRecover',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description: 'Recover your stolen car',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
});

const UnstoppableOnboard = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState();

  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts } = wallets[0];
      setAccount(accounts[0].address);
      navigate.push('/dashboard')
    } catch (error) {
      console.error(error);
    }
  };

  async function handleLogout() {
    uauth.logout()
    onboard.disconnectWallet({label: 'Unstoppable'})
    navigate.push('/')
  }

  return (
    <div className="bg-white-100 ">
      {account && (
        <Blockies
          className="rounded-full"
          seed={account.toLowerCase()}
          size={1}
          scale={1}
        />
      )}
      {account ? (
        <>
          <div className="">

            {truncateAddress(account)}

          </div>
          <div>
            <Button variant="primary" sx={styles.submit }
              type="button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </>
      ) : (
        <div >
          <Button variant="primary" sx={styles.submit }
            type="button"  onClick={connectWallet}
          >
            Launch DApp
          </Button>
        </div>
      )}
    </div>
  );
};

export default UnstoppableOnboard;
const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
  grid: {
    gap: ['30px 60px', null, null, null, '30px 40px', '30px 60px'],
    display: 'grid',
    minHeight: [null, null, null, null, null, '66vh', '81vh'],
    alignItems: 'center',
    gridTemplateColumns: [
      '1fr',
      null,
      null,
      null,
      'repeat(2, 1fr)',
      '510px 1fr',
    ],
  },
  domainCard: {
    background: 'white',
    boxShadow: '0px 24px 50px rgba(54, 91, 125, 0.05)',
    borderRadius: 10,
    p: ['30px 25px 50px', null, null, '40px 40px 60px'],
    m: [null, null, null, '0 auto', 'unset'],
    maxWidth: [null, null, null, 480, 'none'],
    h2: {
      fontWeight: 700,
      fontSize: [8, null, null, 10, 9, 14],
      lineHeight: 1.36,
      letterSpacing: 'heading',
      color: 'textSecondary',
      mb: [5, null, null, 7, 8],
    },
  },
  inputGroup: {
    alignItems: 'center',
    border: (theme) => `1px solid ${theme.colors.borderColor}`,
    borderRadius: 5,
    px: [3, null, null, 6],
    input: {
      border: 0,
      borderRadius: 0,
      fontSize: [1, null, null, 2],
      minHeight: [45, null, null, 60],
      p: 0,
      ':focus': {
        boxShadow: 'none',
      },
      '::placeholder': {
        fontSize: '15px',
        lineHeight: 1.33,
        color: rgba('#02073E', 0.4),
      },
      ':-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
      },
    },
    select: {
      border: 0,
      color: 'textSecondary',
      fontWeight: 500,
      fontSize: [0, null, null, '15px'],
      lineHeight: 1.33,
      letterSpacing: 'heading',
      minHeight: [45, null, null, 60],
      minWidth: [60, null, null, 75],
      p: 0,
      textTransform: 'uppercase',
      ':focus': {
        outline: 0,
      },
      '+ svg': {
        color: '#A6A8BB',
        height: 40,
        width: 40,
      },
    },
  },
  submit: {
    fontSize: [1, null, null, 6],
    mt: [0],
    minHeight: [45, null, null, 60],
    width: '100%',
  },
  note: {
    fontStyle: 'italic',
    fontSize: [0, null, null, '15px'],
    lineHeight: 1.33,
    textAlign: 'center',
    color: rgba('#02073E', 0.5),
    mt: [4],
  },
};
