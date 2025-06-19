import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
import { Input } from "../Components/ui/input"
import { Label } from "../Components/ui/label"
import { Send, ArrowLeft, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { WalletSendTransactionError } from "@solana/wallet-adapter-base"

export default function SendSOL() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState<number>(0.1)
  const [isLoading, setIsLoading] = useState(false)
  const [balance,setBalance] = useState<number>(0);

  const {wallet,publicKey,connected,sendTransaction} = useWallet();
  const {connection} = useConnection();

    WalletSendTransactionError
 
    if (!publicKey) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Wallet not connected. Please connect your wallet.
     </div>
    )
  }

  const getBalance = async() => {
     setBalance( await connection.getBalance(publicKey));
  }

  const receiver = "EnkS3AtUkriWwVu8ab2NPECPkNjPUXXK4yJFFsVD4LKd"

  const checkSol = async() => {
    if(amount > balance){
      alert('not enough sol')
        return;
    }
  }


  useEffect(() => {
    setRecipient(receiver)

    if(publicKey){
      getBalance()
    }

  },[amount,balance,publicKey])


  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
      try {

        if(amount > balance) {
          alert("don't have enough sols to send ")
          return;
        }

      
          const transaction = new Transaction();

          const sendSolInstruction = SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: new PublicKey(receiver),
              lamports: amount * LAMPORTS_PER_SOL,
          });
  
          transaction.add(sendSolInstruction);
  
          const signature = await sendTransaction(transaction,connection);
          
          const notify = () => toast('Transaction Successfull', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            })
         
          if(signature){
            notify()
          }
          
      } catch (error) {
        if (error instanceof WalletSendTransactionError) {
          toast.error('Transaction Failed', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            })
        } else {
          console.error("Transaction failed:", error);
          alert("Transaction failed. Please try again.");
        }
    
      }

  }



  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Send SOL</h1>
      </div>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="h-6 w-6" />
            <span>Transfer SOL</span>
          </CardTitle>
          <CardDescription>Send SOL to any Solana wallet address</CardDescription>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSend} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                type="text"
                placeholder="Enter recipient's public key"
                value={recipient!}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-gray-800 border-gray-700 focus:border-gray-600"
                required
              />
              <p className="text-sm text-gray-400">Enter the recipient's Solana wallet public key</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (SOL)</Label>
              <Input
                id="amount"
                type="number"
                step="0.000000001"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-800 border-gray-700 focus:border-gray-600"
                required
              />
              {
                amount > balance / LAMPORTS_PER_SOL ? <p className="text-sm text-red-700 ">You don't have enough Balance!</p> : <p className="text-sm text-gray-400">Available balance: {balance / LAMPORTS_PER_SOL} SOL</p>
              }
            
            </div>

            {/* <div className="p-4 bg-gray-800/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Amount:</span>
                <span>{amount || "0.00"} SOL</span>
              
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Network Fee:</span>
                <span>~0.000005 SOL</span>
              </div>
              <hr className="border-gray-700" />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{amount ? (amount  + 0.000005).toFixed(9) : "0.000005"} SOL</span>
              </div>
              
            </div> */}

            <Button
              type="submit"
              disabled={isLoading || !recipient || !amount}
              className="gradient-button w-full py-3 text-white font-semibold rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send SOL"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  )
}
