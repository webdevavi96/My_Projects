import { useState } from 'react'
import './App.css'
import { Header, Footer } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Footer />
    </>
  )
}

export default App
