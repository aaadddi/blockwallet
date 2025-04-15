import { NewWallet } from "@/wallets/utils";
import { useState } from "react";

type YourWalletType = {
    addresses: NewWallet[],
}
const YourWallet = (props: YourWalletType) =>{
    const addresses = props.addresses;
    const [showCombined, setShowCombined] = useState(true);

    const renderWalletCard = (wallet: NewWallet) => (
        <div 
            key={wallet.publicKey} 
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
    );

    const renderCombinedView = () => (
        <div className="space-y-4">
            {addresses.map(renderWalletCard)}
        </div>
    );

    const renderSeparatedView = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Ethereum Wallets</h3>
                <div className="space-y-4">
                    {addresses
                        .filter(wallet => wallet.walletType === 'Etherium')
                        .map(renderWalletCard)}
                </div>
            </div>
            <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Solana Wallets</h3>
                <div className="space-y-4">
                    {addresses
                        .filter(wallet => wallet.walletType === 'Solana')
                        .map(renderWalletCard)}
                </div>
            </div>
        </div>
    );

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Your Wallets</h2>
                <button
                    onClick={() => setShowCombined(!showCombined)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
                >
                    {showCombined ? "Show Separated" : "Show Combined"}
                </button>
            </div>
            {addresses.length > 0 ? (
                showCombined ? renderCombinedView() : renderSeparatedView()
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No wallets created yet. Create your first wallet above!
                </div>
            )}
        </div>
    )
}

export default YourWallet;