import { useState } from 'react'
import localFont from 'next/font/local'

const myFont = localFont({ src: './LearningCurve.ttf' })
export default function Silabas({ title }) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)

  const generateJoke = async (prompt) => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json()
      const mensaje = arreglarMensaje(data)
      const mensaje1 = mensaje.split(' ')
      setResult(mensaje)
      console.log(mensaje1)
    } catch (error) {
      alert(error.message)
      return
    }

    setLoading(false)
    // setPrompt("");
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    generateJoke(title)
  }

  const arreglarMensaje = (texto) => {
    return texto.replace(/[-/|_]/g, ' ')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        style={{
          display: 'none',
        }}
        type="text"
        name="name"
        placeholder="Enter an programming language"
        onChange={(e) => setPrompt(e.target.value)}
        value={title}
        autoFocus
      />
      <button
        type="submit"
        className="bg-green-500 p-2 rounded-md block mt-2 disabled:opacity-50 text-white"
        disabled={!title || loading}
      >
        {loading ? 'Thinking...' : 'Silabas'}
      </button>
      {/* {result && <p className={`${myFont.className} text-8xl`}>{result}</p>} */}
      {result && <p className={`${myFont.className} text-8xl`}>{result}</p>}
    </form>
  )
}
