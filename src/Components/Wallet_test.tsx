import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import '@solana/wallet-adapter-react-ui/styles.css';



function Wallet_test() {
    const { connection } = useConnection();
    const { publicKey, connected, connecting } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    let LAMPORTS_PER_SO = 1000_000_000;

    useEffect(() => {
        if (connected && publicKey) {
            fetchBalance();
        } else {
            setBalance(null);
        }
    }, [connected, publicKey, connection]);


    const fetchBalance = async () => {
        if (!publicKey || !connection) return;
        setLoading(true);

        try {
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / LAMPORTS_PER_SO);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }

    const copyAddress = async () => {
        if (publicKey) {
            await navigator.clipboard.writeText(publicKey.toString());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatAddress = (address: string) => {
        if (!address) return '';
        const addrStr = address.toString();
        return `${addrStr.slice(0, 8)}...${addrStr.slice(-8)}`;
    };


    return (
        <div>
            <div className="flex gap-2">
                <WalletMultiButton style={{
                        backgroundImage: "linear-gradient(to right, #131212, #c42e27f9)",
                    color: "white",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 1rem",
                }} />
                {/* <WalletDisconnectButton className="!bg-gray-500 hover:!bg-gray-600" /> */}
            </div>
            <div>
                {balance}
            </div>
        </div>
    )
}

export default Wallet_test