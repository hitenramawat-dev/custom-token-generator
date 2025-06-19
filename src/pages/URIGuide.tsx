"use client"

import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
import { BookOpen, ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

export default function URIGuide() {
  const exampleMetadata = {
    name: "My Awesome Token",
    symbol: "MAT",
    description: "A revolutionary token for the future",
    image: "https://your-domain.com/token-image.png",
    attributes: [
      {
        trait_type: "Type",
        value: "Utility",
      },
      {
        trait_type: "Network",
        value: "Solana",
      },
    ],
    properties: {
      files: [
        {
          uri: "https://your-domain.com/token-image.png",
          type: "image/png",
        },
      ],
      category: "image",
    },
  }

  const copyMetadata = () => {
    navigator.clipboard.writeText(JSON.stringify(exampleMetadata, null, 2))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/create-token">
          <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">URI Guide</h1>
      </div>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span>How to Create Token Metadata URI</span>
          </CardTitle>
          <CardDescription>Learn how to create and host metadata for your SPL token</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What is a Metadata URI?</h3>
            <p className="text-gray-300">
              A metadata URI is a URL that points to a JSON file containing information about your token, including its
              name, description, image, and other properties. This metadata is used by wallets, exchanges, and other
              applications to display your token correctly.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Step-by-Step Guide</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-[#131212] to-[#c42e27f9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Create Your Token Image</h4>
                  <p className="text-gray-400 text-sm">
                    Design a square image (recommended: 512x512px) in PNG or JPG format
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-[#131212] to-[#c42e27f9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Upload Your Image</h4>
                  <p className="text-gray-400 text-sm">
                    Upload to a reliable hosting service (IPFS, Arweave, or your own server)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-[#131212] to-[#c42e27f9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Create Metadata JSON</h4>
                  <p className="text-gray-400 text-sm">
                    Create a JSON file with your token's metadata (see example below)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-[#131212] to-[#c42e27f9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Upload Metadata JSON</h4>
                  <p className="text-gray-400 text-sm">Upload the JSON file to the same hosting service</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-[#131212] to-[#c42e27f9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <div>
                  <h4 className="font-semibold">Use the JSON URL</h4>
                  <p className="text-gray-400 text-sm">
                    Copy the public URL of your JSON file and use it as the metadata URI
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Example Metadata JSON</h3>
            <div className="bg-gray-800 rounded-lg p-4 relative">
              <Button
                onClick={copyMetadata}
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 border-gray-600 hover:bg-gray-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="text-sm text-gray-300 overflow-x-auto pr-12">
                {JSON.stringify(exampleMetadata, null, 2)}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Recommended Hosting Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">IPFS (Recommended)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-400">Decentralized storage, permanent hosting</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Pinata
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      NFT.Storage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Arweave</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-400">Permanent storage blockchain</p>
                  <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    ArDrive
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
            <h4 className="font-semibold text-yellow-400 mb-2">Important Notes</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Make sure your hosting service provides permanent, public URLs</li>
              <li>• Test your metadata URL before creating the token</li>
              <li>• Keep backups of your metadata and images</li>
              <li>• Consider using IPFS for true decentralization</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
