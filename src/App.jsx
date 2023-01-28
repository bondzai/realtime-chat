import { useState } from 'react'
import Chat from "./components/Chat"
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <h2> chat room </h2>
            <Chat/>
        </div>
    )
}

export default App
