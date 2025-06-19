import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";





function TransactionWithSOl() {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const receiver = new PublicKey("EnkS3AtUkriWwVu8ab2NPECPkNjPUXXK4yJFFsVD4LKd");

    const sendSol = async () => {
    
        if (!publicKey) {
            console.error("Wallet not connected");
            return;
        }
    
        try {
            const transaction = new Transaction();
            const sendSolInstruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: receiver,
                lamports: 0.1 * LAMPORTS_PER_SOL,
            });
    
            transaction.add(sendSolInstruction);
    
            const signature = await sendTransaction(transaction,connection);
            console.log(`Transaction signature: ${signature}`);
    
        } catch (error) {
            console.error("Transaction failed", error);
        }
    }
    return (
        <div>
            <button
                onClick={() => sendSol()}
                className="bg-gradient-to-r from-[#131212] to-[#c42e27f9] rounded-xl m-2 p-2 text-white"
            >send SOl</button>
        </div>
    )
}

export default TransactionWithSOl;