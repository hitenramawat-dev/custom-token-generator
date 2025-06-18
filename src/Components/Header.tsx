import Wallet_test from "./Wallet_test"



function Header() {
  return (
    <div>
      {/* simle head */}
      <div className="w-full h-[60px] border-b-[.3px] border-b-white px-2">
        <div className="w-full flex flex-row justify-between">
          {/* left */}
          <div className="flex flex-row justify-between w-[440px] h-[60px] items-center ">
              <h1>Star-sol</h1>
              <h1>Custom-Token</h1>
              <h1>Transaction</h1>
          </div>
          {/* right */}
          <div>
              <div className="flex flex-row justify-end w-[440px] h-[60px] items-center ">
                {/* <div className="mr-4 bg-gradient-to-r from-[#131212] to-[#210F37] px-5 py-2 rounded-xl font-bold hover:bg-gradient-to-r from-[#131212] to-[#c42e27f9]">
                <WalletButton/>
                </div> */}
                <div>
                    <Wallet_test/>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header