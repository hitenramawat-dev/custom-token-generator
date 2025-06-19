import  { useWallet, type Wallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui';


 const ConnectToWallet = async (wallet:Wallet | null) => {
   await wallet?.adapter.connect();
}



function WalletButton() {
    const {wallet,connected,disconnect} = useWallet();
    
    const {setVisible} = useWalletModal();


    const pubkey = wallet?.adapter.publicKey?.toString();
    const pub = pubkey?.slice(0,5);
    const lpub = "...." + pubkey?.slice(40,pubkey.length)

    const finalPubkey = pub?.concat(lpub);

    //FbmSCivwCLKVuQiBqT8aN6LKLXHHQ365NWBqfLUP5p3y
  return (

    <div>
        {
            !connected ? 
            <div>
                    <button className='bg-red-900' onClick={() => setVisible(true)}>
                        Connect Wallet
                    </button>
            </div> 
            :
            <div>
              <button>{finalPubkey}</button>
            </div>
        }
   </div>
  )
}

export default WalletButton