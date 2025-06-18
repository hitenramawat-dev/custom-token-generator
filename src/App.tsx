
import './App.css'
import CustomToken from './Components/Custom-token';

import Header from './Components/Header';
import Transaction from './Components/Transaction';


function App() {


  return (
    <>
     <div className='w-full h-[1100px] bg-black text-white'>
       <Header/>
       <Transaction/>
       {/* <Wallet_test/> */}
       <CustomToken/>
     </div>
    </>
  )
}

export default App
