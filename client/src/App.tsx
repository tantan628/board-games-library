import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Board Games Library</h1>
      {/* TODO: Implement search and library views */}
      <p>Coming soon...</p>
    </div>
  )
}

export default App
