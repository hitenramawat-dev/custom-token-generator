# MintCraft

A modern Solana dApp to create custom SPL tokens and send SOL, built with React, TypeScript, and Vite.

## Features

- **Make Custom Token**: Easily create your own SPL token on the Solana blockchain with custom name, symbol, supply, decimals, and metadata URI.
- **Send SOL**: Transfer SOL to any Solana wallet address with a simple interface.
- **Metadata URI Guide**: Step-by-step instructions to create and host your token's metadata for use in wallets and dApps.

---

## 1. Make Custom Token

1. Connect your Solana wallet on the Dashboard.
2. Click on **Create Token**.
3. Fill in the following details:
   - **Token Name**: e.g., My Awesome Token
   - **Token Symbol**: e.g., MAT
   - **Metadata URI**: Link to your token's metadata JSON (see guide below)
   - **Initial Supply**: Total number of tokens to mint
   - **Decimals**: Usually 9 for SPL tokens
4. Click **Create Token**. Your token will be created on Solana!

## 2. Send SOL

1. Connect your Solana wallet on the Dashboard.
2. Click on **Send SOL**.
3. Enter the recipient's wallet address and the amount of SOL to send.
4. Click **Send SOL**. Confirm the transaction in your wallet.

---

## 3. How to Create a Metadata URI (for Custom Tokens)

A metadata URI is a public URL pointing to a JSON file describing your token (name, symbol, image, etc). Follow these steps:

### Step-by-Step Guide

1. **Create Your Token Image**
   - Design a square image (recommended: 512x512px, PNG or JPG).
2. **Upload Your Image**
   - Use a reliable hosting service (IPFS, Arweave, or your own server).
3. **Create Metadata JSON**
   - Example:
     ```json
     {
       "name": "My Awesome Token",
       "symbol": "MAT",
       "description": "A revolutionary token for the future",
       "image": "https://your-domain.com/token-image.png",
       "attributes": [
         { "trait_type": "Type", "value": "Utility" },
         { "trait_type": "Network", "value": "Solana" }
       ],
       "properties": {
         "files": [
           { "uri": "https://your-domain.com/token-image.png", "type": "image/png" }
         ],
         "category": "image"
       }
     }
     ```
4. **Upload Metadata JSON**
   - Upload the JSON file to the same hosting service.
5. **Use the JSON URL**
   - Copy the public URL of your JSON file. Use this as the Metadata URI when creating your token.

### Recommended Hosting Services
- [Pinata (IPFS)](https://www.pinata.cloud/)
- [NFT.Storage (IPFS)](https://nft.storage/)
- [ArDrive (Arweave)](https://ardrive.io/)

### Important Notes
- Make sure your hosting service provides permanent, public URLs.
- Test your metadata URL before creating the token.
- Keep backups of your metadata and images.
- Consider using IPFS for true decentralization.

---

## Getting Started (Development)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

---

Built with ❤️ for the Solana community.
