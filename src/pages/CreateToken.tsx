"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
import { Input } from "../Components/ui/input"
import { Label } from "../Components/ui/label"
import { Textarea } from "../Components/ui/textarea"
import { Plus, ArrowLeft, HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function CreateToken() {
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenUri, setTokenUri] = useState("")
  const [initialSupply, setInitialSupply] = useState("")
  const [decimals, setDecimals] = useState("9")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate token creation
    setTimeout(() => {
      setIsLoading(false)
      alert("Token created successfully!")
      setTokenName("")
      setTokenSymbol("")
      setTokenUri("")
      setInitialSupply("")
    }, 3000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create Token</h1>
      </div>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-6 w-6" />
            <span>Create SPL Token</span>
          </CardTitle>
          <CardDescription>Create your own token on the Solana blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Token Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., My Awesome Token"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="bg-gray-800 border-gray-700 focus:border-gray-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symbol">Token Symbol</Label>
              <Input
                id="symbol"
                type="text"
                placeholder="e.g., MAT"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                className="bg-gray-800 border-gray-700 focus:border-gray-600"
                maxLength={10}
                required
              />
              <p className="text-sm text-gray-400">Short identifier for your token (max 10 characters)</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="uri">Metadata URI</Label>
                <Link to="/uri-guide">
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </Link>
              </div>
              <Textarea
                id="uri"
                placeholder="https://your-domain.com/metadata.json"
                value={tokenUri}
                onChange={(e) => setTokenUri(e.target.value)}
                className="bg-gray-800 border-gray-700 focus:border-gray-600 min-h-[80px]"
                required
              />
              <p className="text-sm text-gray-400">
                URL pointing to your token's metadata JSON file.
                <Link to="/uri-guide" className="text-blue-400 hover:underline ml-1">
                  Need help creating one?
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supply">Initial Supply</Label>
                <Input
                  id="supply"
                  type="number"
                  placeholder="1000000"
                  value={initialSupply}
                  onChange={(e) => setInitialSupply(e.target.value)}
                  className="bg-gray-800 border-gray-700 focus:border-gray-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="decimals">Decimals</Label>
                <Input
                  id="decimals"
                  type="number"
                  min="0"
                  max="9"
                  value={decimals}
                  onChange={(e) => setDecimals(e.target.value)}
                  className="bg-gray-800 border-gray-700 focus:border-gray-600"
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg space-y-2">
              <h3 className="font-semibold">Token Preview</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span>{tokenName || "Token Name"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Symbol:</span>
                  <span>{tokenSymbol || "SYMBOL"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Supply:</span>
                  <span>{initialSupply ? Number(initialSupply).toLocaleString() : "0"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Creation Fee:</span>
                  <span>~0.01 SOL</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !tokenName || !tokenSymbol || !tokenUri || !initialSupply}
              className="gradient-button w-full py-3 text-white font-semibold rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Creating Token..." : "Create Token"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
