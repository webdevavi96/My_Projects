import { useState } from 'react'
import './App.css'
import Crad from './components/card.jsx'
import CounterDiv from './components/button.jsx'



function App() {

  return (
    <>
  <Crad title="First Card" content="this is the first para of my card"/>
  <CounterDiv />
    </>
  )
}

export default App
