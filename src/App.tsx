import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./Components/Navigation"
import Dashboard from "./pages/Dashboard"
import SendSOL from "./pages/SendSol"
import CreateToken from "./pages/CreateToken"
import URIGuide from "./pages/URIGuide"
import "./index.css"





import './App.css'
import CustomToken from './Components/Custom-token';

import Header from './Components/Header';
import MetadataToken from './Components/MetadataToken';
import Transaction from './Components/Transaction';


function App() {


  return (
    <>
     {/* <div className='w-full h-[1100px] bg-black text-white'>
       <Header/>
       <div className='flex items-center w-full justify-center'>
        <Transaction/>
        <CustomToken/>
        <MetadataToken/>
       </div>

     </div> */}
     <Router>
      <div className="bg-black text-white min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/send" element={<SendSOL />} />
            <Route path="/create-token" element={<CreateToken />} />
            <Route path="/uri-guide" element={<URIGuide />} />
          </Routes>
        </main>
      </div>
    </Router>
    </>
  )
}

export default App
