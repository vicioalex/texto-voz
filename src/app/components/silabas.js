import { useState } from 'react'
import localFont from 'next/font/local'
import SVGIcon from './SVGIcon'
import Speech from 'react-text-to-speech'

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
    setIndice(0)
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
      fill="white" // Cambia el color de relleno aquí
      stroke="gray"
      strokeWidth="1"
      d="M50.72 21.98l0 16.26c0,7.24 -5.04,6.72 -9.24,3.32l-14.07 -11.38 -0.02 11.56c-0,3.11 -5.52,2.39 -8.59,-0.25l-17.54 -15.1c-0.91,-0.79 -1.26,-2.34 -1.26,-4.41 0,-2.07 0.34,-3.62 1.26,-4.41l17.54 -15.1c3.07,-2.65 8.59,-3.36 8.59,-0.25l0.02 11.56 14.07 -11.38c4.2,-3.4 9.24,-3.92 9.24,3.32l0 16.26z"
    />
  )

  const startBtn = (
    <button
      disabled={indice === silabas.length - 1}
      className="my-start-btn"
      onClick={() => {
        avanzar()
      }}
    >
      <SVGIcon
        svgCode={svgCode}
        width="40"
        height="34"
        fill="none"
        viewBox="0 0 50.72 43.96"
        style={{ transform: 'scaleX(-1)' }}
      />
    </button>
  )
  const pauseBtn = (
    <button className="my-pause-btn" disabled={true}>
      <SVGIcon
        svgCode={svgCode}
        width="40"
        height="34"
        fill="none"
        viewBox="0 0 50.72 43.96"
        style={{ transform: 'scaleX(-1)' }}
      />
    </button>
  )
  const stopBtn = <button className="my-stop-btn"></button>
  const startBtn2 = (
    <button
      disabled={indice === silabas.length - 1}
      className="my-start-btn"
      onClick={() => {
        retroceder()
      }}
    >
      <SVGIcon
        svgCode={svgCode}
        width="40"
        height="34"
        fill="none"
        viewBox="0 0 50.72 43.96"
      />
    </button>
  )
  const pauseBtn2 = (
    <button className="my-pause-btn" disabled={true}>
      <SVGIcon
        svgCode={svgCode}
        width="40"
        height="34"
        fill="none"
        viewBox="0 0 50.72 43.96"
      />
    </button>
  )
  const stopBtn2 = <button className="my-stop-btn"></button>

  return (
    <>
      <div className="grid grid-cols-5 gap-0 bg-black bg-opacity-20">
        <div className="col-span-5 bg-white bg-opacity-40 h-3"></div>
        <div className="flex items-center justify-center"></div>
        <div className="flex items-center justify-center">
          <Speech
            text={silabas[indice - 1]}
            rate={0.9}
            volume={1}
            lang="es-ES"
            startBtn={startBtn2}
            pauseBtn={pauseBtn2}
            stopBtn={stopBtn2}
            onError={() => console.error('Browser not supported!')}
          />
        </div>
        <div className="flex items-center justify-center">
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
        </div>
        <div className="flex items-center justify-center">
          <Speech
            text={silabas[indice + 1]}
            rate={0.9}
            volume={1}
            lang="es-ES"
            startBtn={startBtn}
            pauseBtn={pauseBtn}
            stopBtn={stopBtn}
            onError={() => console.error('Browser not supported!')}
          />
        </div>
        <div className="flex items-center justify-center"></div>
      </div>
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
              <Speech
                text={elemento}
                rate={0.9}
                volume={1}
                lang="es-ES"
                onError={() => console.error('Browser not supported!')}
              >
                {({ speechStatus, start, pause, stop }) => (
                  <div>
                    {speechStatus !== 'started' && (
                      <button className="my-start-btn" onClick={start}>
                        {`${elemento}`}
                      </button>
                    )}
                    {speechStatus === 'started' && (
                      <button className="my-pause-btn">{`${elemento}`}</button>
                    )}
                  </div>
                )}
              </Speech>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
