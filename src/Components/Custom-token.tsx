// //@metaplex-foundation/mpl-token-metadata


import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction
} from "@solana/web3.js";

function CustomToken() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleMint = async () => {
    if (!publicKey) {
      console.error("Wallet not connected.");
      return;
    }

    const mintKeypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const ata = (
      await PublicKey.findProgramAddressSync(
        [
          publicKey.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    )[0];

    const CreateMintAccount = SystemProgram.createAccount({
      fromPubkey: publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    });

    const InitMint = createInitializeMintInstruction(
      mintKeypair.publicKey,
      9,
      publicKey,
      publicKey
    );

    const tokenAccount = createAssociatedTokenAccountInstruction(
      publicKey,
      ata,
      publicKey,
      mintKeypair.publicKey
    );

    const MintTo = createMintToInstruction(
      mintKeypair.publicKey,
      ata,
      publicKey,
      10n * 10n ** 9n
    );

    const transaction = new Transaction().add(
      CreateMintAccount,
      InitMint,
      tokenAccount,
      MintTo
    );

    const sign = await sendTransaction(transaction, connection, {
      signers: [mintKeypair],
    });

    await connection.confirmTransaction(sign, "confirmed");
    console.log("Created successfully", sign);
  };



  return (
    <div>
      <button
        onClick={handleMint}
        className="bg-gray-800 px-4 py-2 text-white rounded-md"
      >
        Create Custom Token
      </button>
    </div>
  );
}

export default CustomToken;
