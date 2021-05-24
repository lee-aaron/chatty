import React from 'react';
import './wallet.scss';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const web3 = createAlchemyWeb3(alchemyKey || '');
declare let window: any;

const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const address = await window.ethereum.enable();
      const obj = {
        connectedStatus: true,
        status: "",
        address: address
      }
      return obj;
    } catch (err) {
      return {
        connectedStatus: false,
        status: "🦊 Connect to Metamask using the button on the top right."
      }
    }
  } else {
    return {
      connectedStatus: false,
      status: "🦊 You must install Metamask in your browser: https://metamask.io/download.html"
    }
  }
}

const Wallet = () => {

  const [isConnected, setConnectedStatus] = React.useState(false);
  const [walletAddress, setWallet] = React.useState("");
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    async function connect() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length) {
            setConnectedStatus(true);
            setWallet(accounts[0]);
          } else {
            setConnectedStatus(false);
            setStatus("🦊 Connect to Metamask using the top right button.");
          }
        } catch {
          setConnectedStatus(false);
          setStatus(
            "🦊 Connect to Metamask using the top right button. " +
              walletAddress
          );
        }
      }
    }
    connect();
  }, [walletAddress]);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setConnectedStatus(walletResponse.connectedStatus);
    setStatus(walletResponse.status);
    if (isConnected) {
      setWallet(walletAddress);
    }
  };

  return (
    <section className="wallet">
      <button id="walletButton" onClick={connectWalletPressed}>
        {isConnected ? (
          "👛 Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>👛 Connect Wallet</span>
        )}
      </button>

    </section>
  )
}

export default Wallet;