import { useState } from 'react'
import localFont from 'next/font/local'
import SVGIcon from './SVGIcon'

const myFont = localFont({ src: './LearningCurve.ttf' })
export default function Silabas({ title }) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)
  const [silabas, setSilabas] = useState([])
  const [indice, setIndice] = useState(0)

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
      // const mensaje = arreglarMensaje(data)
      const mensaje = arreglarMensaje(data)
      const mensaje1 = mensaje.split(' ')
      setResult(mensaje)
      setSilabas(mensaje1)
      console.log(mensaje1)
      // console.log(mensaje2)
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
    // Reemplaza los guiones, etc. por espacios regex
    texto = texto.replace(/\([^)]*\)/g, '').replace(/[:.]/g, '')
    //borra el contenido entre paréntesis regex
    texto = texto.replace(/[-/|_]/g, ' ')
    // Borra mas de dos espacios vacios
    texto = texto.replace(/\s+/g, ' ')
    // Borra espacio vacio al empezar
    texto = texto.replace(/^\s+|\s+$/g, '')
    return texto
  }

  let elementoRenderizado

  if (result) {
    // Si result tiene un valor
    elementoRenderizado = (
      <p className={`${myFont.className} text-8xl`}>{result}</p>
    )
  }
  // avanzar silaba por silaba
  const avanzar = () => {
    if (indice < silabas.length - 1) {
      setIndice(indice + 1)
    }
  }
  // retroceder silaba por silaba
  const retroceder = () => {
    if (indice > 0) {
      setIndice(indice - 1)
    }
  }
  // iconos SVG
  const svgCode = (
    <path
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  )

  return (
    <>
      <div className="grid grid-cols-5 gap-0 bg-black bg-opacity-20">
        <div className="col-span-5">Columna 1</div>
        <div className="flex items-center justify-center">
          <button className="flex items-center justify-center p-2 text-white">
            <SVGIcon svgCode={svgCode} width="24" height="24" fill="none" />
          </button>
        </div>
        <div className="flex items-center justify-center">Columna 2</div>
        <div className="flex items-center justify-center">Columna 3</div>
        <div className="flex items-center justify-center">Columna 4</div>
        <div className="flex items-center justify-center">Columna 5</div>
      </div>
      <button onClick={retroceder} disabled={indice === 0}>
        Retroceder
      </button>
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
          {loading ? 'Cargando...' : 'Silabas'}
        </button>
        {/* {result && elementoRenderizado} */}
      </form>
      <button onClick={avanzar} disabled={indice === silabas.length - 1}>
        Avanzar
      </button>

      <div
        style={{
          lineHeight: 0.7,
        }}
        className={`${myFont.className} w-screen text-8xl mt-5`}
      >
        <div className="flex flex-wrap">
          {silabas.map((elemento, i) => (
            // <span key={i} style={{ color: indice === i ? 'red' : 'black' }}>
            <span
              className={`px-5`}
              key={i}
              style={{
                color: indice === i ? 'red' : 'black',
                backgroundColor: indice === i ? 'yellow' : 'transparent',
              }}
            >
              {`${elemento}`}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
