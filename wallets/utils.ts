import { generateMnemonic, mnemonicToSeed } from "bip39";
import { Wallet,HDNodeWallet } from "ethers";
import { Keypair } from "@solana/web3.js";
import * as ed25519 from "ed25519-hd-key";

export const getNewMnemonic = () =>{
    return generateMnemonic();
}
export type NewWallet = {
     walletType: string,
    currentIndex : Number,
    publicKey: string,
    privateKey: any
}

type CreateParams = {
    seedMnemonic: string,
    currentIndex: Number
}
export const createEtheriumWallet = async ({seedMnemonic, currentIndex}:CreateParams) =>{
    const seed = await mnemonicToSeed(seedMnemonic)
    const derivationPath = `m/44/60/${currentIndex}/0`
    const hdNode = HDNodeWallet.fromSeed(seed)
    const child = hdNode.derivePath(derivationPath)
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    const publicKey = wallet.address;
    return {
        walletType: "ethereum",
        currentIndex,
        publicKey,
        privateKey
    }
}
export const createSolanaWallet = async ({seedMnemonic, currentIndex}:CreateParams) =>{
    const seed = await mnemonicToSeed(seedMnemonic);
    const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
    
    const derived = ed25519.derivePath(derivationPath,  seed.toString('hex')).key;
    const keypair = Keypair.fromSeed(derived);
    const publicKey = keypair.publicKey.toBase58();
    const privateKey = keypair.secretKey;
    return {
        walletType: "solana",
        currentIndex,
        publicKey,
        privateKey
    }
}