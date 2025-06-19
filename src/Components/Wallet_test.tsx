import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import '@solana/wallet-adapter-react-ui/styles.css';



function Wallet_test() {
     const { connection } = useConnection();
     const { publicKey } = useWallet();
     const [balance, setBalance] = useState<number | null>(null);
     
    let LAMPORTS_PER_SO = 1000_000_000;

   
   


    const fetchBalance = async () => {
        if (!publicKey || !connection) return;
       

        try {
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / LAMPORTS_PER_SO);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }


    return (
        <div>
            <div className="flex gap-2">
                <WalletMultiButton style={{
                        backgroundImage: "linear-gradient(to right, #131212, #c42e27f9)",
                    color: "white",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 1rem",
                }} />
            </div>
            <div>
                {balance}
            </div>
        </div>
    )
}

export default Wallet_test