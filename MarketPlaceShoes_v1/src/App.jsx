import { useState } from 'react'
import Nav from './components/Nav'
import Foot from './components/Foot'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Nav />
        <h2>MarketPlace Shoes</h2>
        <Foot />
      </div >
    </>
  )
}

export default App
