import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("")

  return (

    <div className='w-full h-screen flex-wrap bg-lime-300'
      style={{ backgroundColor: color }}
    >
      <div className='justify-center flex-wrap bg-blue-500'>
        <button
          className='bg-red-700 rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("red")}
        >Red</button>
        <button
          className='bg-green-700 rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("green")}
        >Green</button>
        <button
          className='bg-pink-700 rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("pink")}
        >Pink</button>
        <button
          className='bg-blue-700 rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("blue")}
        >Blue</button>
        <button
          className='bg-black rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("black")}
        >Black</button>
        <button
          className='bg-amber-800 rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("brown")}
        >Brown</button>
        <button
          className='bg-orange-700 rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("orange")}
        >Orange</button>
        <button
          className='bg-yellow-700 rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("yellow")}
        >Yellow</button>
        <button
          className='bg-purple-700 rounded-2xl p2 px-4 m-2 text-white border-2 bordrer-white'
          onClick={() => setColor("purple")}
        >Purple</button>
      </div>
    </div>
  )
}

export default App
