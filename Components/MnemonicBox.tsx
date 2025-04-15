"use client"
import { useState } from "react";

type MnemonicBoxProps = {
    mnemonic: string;
    onRestore?: (mnemonic: string) => void;
}

const MnemonicBox = (props: MnemonicBoxProps) => {
    let mnemonic = props.mnemonic;
    const [showMnemonic, setShowMnemonic] = useState(false);
    const [copied, setCopied] = useState(false);
    const [restoreMnemonic, setRestoreMnemonic] = useState("");
    const [showRestoreMnemonic, setShowRestoreMnemonic] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(mnemonic);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRestore = () => {
        if (props.onRestore) {
            props.onRestore(restoreMnemonic);
            setRestoreMnemonic(""); // Clear the input after restore
        }
    };

    return (
        <div className="mb-6">
            <div className="flex space-x-2">
                <button 
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                    onClick={() => setShowMnemonic(!showMnemonic)}
                >
                    {showMnemonic ? "Hide" : "Show"} Seed Phrase
                </button>
                
                {showMnemonic && mnemonic && (
                    <button 
                        className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium py-2 px-4 rounded-md transition-colors"
                        onClick={handleCopy}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                )}
            </div>
            
            {showMnemonic && mnemonic && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h2 className="text-sm font-medium text-gray-700 mb-2">Your Seed Phrase</h2>
                    <p className="font-mono text-sm bg-gray-100 p-3 rounded">{mnemonic}</p>
                    <p className="text-xs text-gray-500 mt-2">Keep this phrase safe and never share it with anyone!</p>
                </div>
            )}

            <div className="mt-4">
                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <input
                            type={showRestoreMnemonic ? "text" : "password"}
                            value={restoreMnemonic}
                            onChange={(e) => setRestoreMnemonic(e.target.value)}
                            placeholder="Enter your seed phrase to restore wallets"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowRestoreMnemonic(!showRestoreMnemonic)}
                        >
                            {showRestoreMnemonic ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <button 
                        className="bg-green-200 hover:bg-green-300 text-green-800 font-medium py-2 px-4 rounded-md transition-colors"
                        onClick={handleRestore}
                        disabled={!restoreMnemonic.trim()}
                    >
                        Restore Wallets
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MnemonicBox;