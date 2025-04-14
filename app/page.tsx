"use client"
import { useState } from "react";
import {createEtheriumWallet, createSolanaWallet, getNewMnemonic} from "../wallets/utils"
import { NewWallet } from "../wallets/utils";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<NewWallet[]>([]);
  const [mnemonic, setMnemonic] = useState<string>("")
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [newWalletType, setNewWalletType] = useState<'Solana'| 'Etherium'>('Solana')

  const handleNewWallet = async () =>{
    let seedMnemonic = mnemonic;    
    
    if (!seedMnemonic) {
      seedMnemonic = getNewMnemonic();
      setMnemonic(seedMnemonic);
    }

    if(newWalletType == 'Etherium'){
      const wallet = await createEtheriumWallet({seedMnemonic, currentIndex})
      setCurrentIndex(currentIndex + 1)
      setAddresses([...addresses, wallet])
    }

    if(newWalletType == 'Solana'){
      const wallet = await createSolanaWallet({seedMnemonic, currentIndex})
      setCurrentIndex(currentIndex + 1)
      setAddresses([...addresses, wallet])
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Blockchain Wallet Manager</h1>
          
          <div className="flex space-x-4 mb-6">
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              onClick={() => {
                setNewWalletType("Etherium")
                handleNewWallet()
              }}
            >
              Create Ethereum Wallet
            </button>
            <button 
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              onClick={() => {
                setNewWalletType("Solana")
                handleNewWallet()
              }}
            >
              Create Solana Wallet
            </button>
          </div>

          <div className="mb-6">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
              onClick={() => setShowMnemonic(!showMnemonic)}
            >
              {showMnemonic ? "Hide" : "Show"} Seed Phrase
            </button>
            
            {showMnemonic && mnemonic && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h2 className="text-sm font-medium text-gray-700 mb-2">Your Seed Phrase</h2>
                <p className="font-mono text-sm bg-gray-100 p-3 rounded">{mnemonic}</p>
                <p className="text-xs text-gray-500 mt-2">Keep this phrase safe and never share it with anyone!</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Wallets</h2>
            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((wallet, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 bg-gray-50 rounded-md border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {wallet.walletType}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Index: {wallet.currentIndex.toString()}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-mono break-all">{wallet.publicKey}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No wallets created yet. Create your first wallet above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
