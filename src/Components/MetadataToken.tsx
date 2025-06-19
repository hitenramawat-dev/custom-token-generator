

import { createCreateMetadataAccountV2Instruction, createCreateMetadataAccountV3Instruction, type DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';




function MetadataToken() {
    const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
      
    const {connection} = useConnection();
    const {wallet,sendTransaction} = useWallet();

    const payer = wallet?.adapter.publicKey!;

    const getMetaData   = async (mint:PublicKey):Promise<PublicKey> => {
        return(
            await PublicKey.findProgramAddressSync(
                [
                    Buffer.from("metadata"),
                    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                    mint.toBuffer()
                ],
                TOKEN_METADATA_PROGRAM_ID
            )
        )[0]
    };

    let uri = "https://gist.githubusercontent.com/hitenramawat-dev/c7049cfbc6ff39d7a000e3ecf954c521/raw/e7155841315d9c6b37396ed6990495a7df70efac/metadata.json"

    const metadataData:DataV2 = {
        name:"greenSheep",
        symbol:"GSHP",
        uri: uri,
        sellerFeeBasisPoints: 0, 
        creators:[{
            address: payer,
            verified: true,
            share: 100,
          },],
        collection: null,
        uses: null,
    }

    let mintAddress = new PublicKey("2o38bgKJek5Y2buDBZGVKj8Zfp2sk5QTHueifD3dJDAk")

    // const metadataAccount = async():Promise<PublicKey> => {
    //     let pubkey  = (await getMetaData(mintAddress)).toString();

    //     return new PublicKey(pubkey);
    // } 



    const initTransaction  = async() => {

    //     const tx = new Transaction().add(
    //         createCreateMetadataAccountV2Instruction(
    //             {
    //                 metadata: await getMetaData(mintAddress),
    //                 mint: mintAddress,
    //                 mintAuthority: payer,       
    //                 payer: payer,             
    //                 updateAuthority: payer,
    //             },{
    //                 createMetadataAccountArgsV2: {
    //                   data: metadataData,
    //                   isMutable: true,
    //                 }
    //               }
    //         )
    //    )
    const tx = new Transaction().add(
        createCreateMetadataAccountV3Instruction(
          {
            metadata: await getMetaData(mintAddress), // PDA of metadata account
            mint: mintAddress,
            mintAuthority: payer,
            payer: payer,
            updateAuthority: payer,
          },
          {
            createMetadataAccountArgsV3: {
                data: metadataData,
                isMutable: true,
                collectionDetails: null,
            }
          }
        )
      );

       tx.feePayer = payer;
       tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
       const signature = await sendTransaction(tx, connection);
       await connection.confirmTransaction(signature, "confirmed");
       console.log(signature);

    }

   

  return (
    <div className="p-4">
    <button
      onClick={initTransaction}
      className="bg-green-600 text-white px-4 py-2 rounded-md"
    >
      Create Metadata
    </button>
  </div>
  )
}

export default MetadataToken