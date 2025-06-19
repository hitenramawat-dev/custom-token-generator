"use client"

import { useEffect, useState } from "react"
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
import { Wallet, Copy, ExternalLink, Send, Plus, ClipboardCheck } from "lucide-react"

import Wallet_test from "../Components/Wallet_test"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useNavigate } from "react-router-dom"



export default function Dashboard() {
 
  const [balance, setBalance] = useState<number | null>(0)
  const [copied,setCopied] = useState(false)
  const {connected,disconnect,publicKey} =  useWallet();
  const {connection} = useConnection();

  const navigate = useNavigate();

   const getBalance = async() => {
    setBalance((await connection.getBalance(publicKey!)) / LAMPORTS_PER_SOL)
   }

   useEffect(() => {
    getBalance()
   },[publicKey,connected])


  const disconnectWallet = async() => {
    await disconnect().catch((e) => {
        console.log(e);
     })
}

  const copyAddress = async() => {
   await navigator.clipboard.writeText(publicKey?.toBase58()!)
     setCopied(true);
     setTimeout(() => setCopied(false), 500);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#131212] to-[#c42e27f9] bg-clip-text text-transparent">
         MintCraft
        </h1>
        <p className="text-gray-400 text-lg">Connect your wallet to send SOL and create tokens on Solana</p>
      </div>
      {/* bg-gray-900/50 */}

      <Card className="bg-black border-gray-800">
        <CardHeader className="">
          <CardTitle className="">
            <Wallet className="h-6 w-6" />
            <span>Wallet Connection</span>
          </CardTitle>
          <CardDescription>Connect your Solana wallet to get started</CardDescription>
        </CardHeader>


        <CardContent className="space-y-4">
          {!connected ? (
            <div>
              {/* <BaseWalletMultiButton2 {...props} labels={LABELS}/> */}
              <Wallet_test/>
            </div>
          ) : (<div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Wallet Address</p>
                <p className="font-mono text-sm">{publicKey?.toBase58()!}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAddress}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  {copied ? <ClipboardCheck /> : <Copy className="h-4 w-4" /> } 
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Balance</p>
                <p className="text-2xl font-bold">{balance} SOL</p>
              </div>
            </div>

            <Button onClick={disconnectWallet} variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
              Disconnect Wallet
            </Button>
          </div>
          )}
        </CardContent>
      </Card>


      {/* Bottom modal send sol and createToken --> Only when wallet is connected */}
      {connected && (
        <div   className="grid md:grid-cols-2 gap-6">

          <Card onClick={() => navigate("/send")} className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Send SOL</span>
              </CardTitle>
              <CardDescription>Transfer SOL to another wallet address</CardDescription>
            </CardHeader>
          </Card>

          <Card onClick={() => navigate("/create-token")}  className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create Token</span>
              </CardTitle>
              <CardDescription>Create your own SPL token on Solana</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

    </div>
  )
}


