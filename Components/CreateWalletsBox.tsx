"use client"
import { useState } from "react"
import {createEtheriumWallet, createSolanaWallet, getNewMnemonic, NewWallet} from "../wallets/utils"

type CreateWalletBoxPropsType = {
    mnemonic: string, 
    setMnemonic: (seedMnemonic: string) => void,
    currentIndex: number,
    setCurrentIndex: (index: number) => void,
    addresses: NewWallet[],
    setAddresses: (addresses: NewWallet[]) => void
}

const CreateWalletBox = (props: CreateWalletBoxPropsType) =>{
    const {
        mnemonic,
        setMnemonic,
        addresses,
        setAddresses,
        currentIndex,
        setCurrentIndex
    } = props;

    const handleNewWallet = async (walletType: 'Solana' | 'Etherium') =>{
        let seedMnemonic = mnemonic;    
        
        if (!seedMnemonic) {
          seedMnemonic = getNewMnemonic();
          setMnemonic(seedMnemonic);
        }
    
        if(walletType === 'Etherium'){
          const wallet = await createEtheriumWallet({
            seedMnemonic, 
            currentIndex
          });
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet]);
        }
    
        if(walletType === 'Solana'){
          const wallet = await createSolanaWallet({
            seedMnemonic, 
            currentIndex
          });
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet]);
        }
      }

    return (
        <div className="flex space-x-4 mb-6">
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              onClick={() => handleNewWallet('Etherium')}
            >
              Create Ethereum Wallet
            </button>
            <button 
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              onClick={() => handleNewWallet('Solana')}
            >
              Create Solana Wallet
            </button>
          </div>
    )
}

export default CreateWalletBox;