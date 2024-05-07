"use client";

import React from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import {ThemeProvider} from 'next-themes'

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
// Required for Transaction Notifications and Transaction Preview
const apiKey = "1730eff0-9d50-4382-a3fe-89f0d34a2070";

const injected = injectedModule();

const infuraKey = "<INFURA_KEY>";
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;


// initialize Onboard
init({
  apiKey,
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl,
    },
    {
      id: 42161,
      token: "ARB-ETH",
      label: "Arbitrum One",
      rpcUrl: "https://rpc.ankr.com/arbitrum",
    },
    {
      id: "0xa4ba",
      token: "ARB",
      label: "Arbitrum Nova",
      rpcUrl: "https://nova.arbitrum.io/rpc",
    },
    {
      id: "0x2105",
      token: "ETH",
      label: "Base",
      rpcUrl: "https://mainnet.base.org",
    },
  ],
});


export default function App({ children}) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  }

  return (
    <html>
      <body>
        <button
          disabled={connecting}
          onClick={() => (wallet ? disconnect(wallet) : connect())}
          style={{
            fontSize: '1.2rem', // Increase font size
            padding: '10px 20px', // Add padding for larger button
            position: 'fixed', // Position absolutely for right-side placement
            right: '20px', // Set right margin for positioning
            top: '10%', // Center vertically with transform
            transform: 'translateY(-50%)', // Center vertically with transform
            backgroundColor: '#C70039', // Set background color (optional)
            color: '#fff', // Set text color (optional)
            borderRadius: '5px', // Add border radius for smoother corners (optional)
          }}
        >
          {connecting ? "connecting" : wallet ? "disconnect" : "connectWallet"}
        </button>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem/>{children}
      </body>
    </html>
  );
        }
