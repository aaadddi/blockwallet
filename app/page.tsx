"use client"
import { useState, useRef, useEffect } from "react";
import { NewWallet, createEtheriumWallet, createSolanaWallet, getNewMnemonic } from "../wallets/utils";
import MnemonicBox from "@/Components/MnemonicBox";
import CreateWalletBox from "@/Components/CreateWalletsBox";
import YourWallet from "@/Components/YourWallet";

type WalletState = {
  currentIndex: number;
  addresses: NewWallet[];
  mnemonic: string;
}

const initialState: WalletState = {
  currentIndex: 0,
  addresses: [],
  mnemonic: ""
};

export default function Home() {
  const [walletState, setWalletState] = useState<WalletState>(initialState);
  const isRestoring = useRef(false);

  // Cleanup function
  useEffect(() => {
    return () => {
      // Reset state when component unmounts
      setWalletState(initialState);
    };
  }, []);

  const handleRestore = async (restoreMnemonic: string) => {
    if (isRestoring.current) return; // Prevent multiple restores
    isRestoring.current = true;

    try {
      // First, completely reset the state
      setWalletState(initialState);

      // Wait for state to reset
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create new wallets with the restored mnemonic
      const newWallets: NewWallet[] = [];
      
      // Create 2 Ethereum wallets
      let i = 0;
      while(i<2) {
        const ethWallet = await createEtheriumWallet({ 
          seedMnemonic: restoreMnemonic, 
          currentIndex: i 
        });
        i++;
        newWallets.push(ethWallet);
      }
      
      // Create 2 Solana wallets
      while(i<5){
        const solWallet = await createSolanaWallet({ 
          seedMnemonic: restoreMnemonic, 
          currentIndex: i 
        });
        i++;
        newWallets.push(solWallet);
      }
      
      // Update state with new wallets
      setWalletState({
        currentIndex: 2,
        addresses: newWallets,
        mnemonic: restoreMnemonic
      });
    } catch (error) {
      console.error("Error restoring wallets:", error);
      setWalletState(initialState);
    } finally {
      isRestoring.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Blockchain Wallet Manager</h1>
          <CreateWalletBox 
            mnemonic={walletState.mnemonic} 
            setMnemonic={(mnemonic) => setWalletState(prev => ({...prev, mnemonic}))} 
            currentIndex={walletState.currentIndex}
            setCurrentIndex={(index) => setWalletState(prev => ({...prev, currentIndex: index}))}
            addresses={walletState.addresses}
            setAddresses={(addresses) => setWalletState(prev => ({...prev, addresses}))}
          />
          <MnemonicBox mnemonic={walletState.mnemonic} onRestore={handleRestore}/>
          <YourWallet addresses={walletState.addresses}/>
        </div>
      </div>
    </div>
  );
}
