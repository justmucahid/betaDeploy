import { useState } from 'react'
import './App.css'
//import Smple from './components/smple/Smple'
import Home from './components/home/Home'
import Blink from './components/blink/Blink'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Blink />
        <Home />
      </div>
    </>
  )
}

export default App