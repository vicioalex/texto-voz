import { useState, useRef } from 'react'
import Speech from 'react-text-to-speech'
import localFont from 'next/font/local'
import Image from 'next/image'
import Silabas from './silabas'

const myFont = localFont({ src: './LearningCurve.ttf' })

export default function Voz() {
  const [inputText, setInputText] = useState('')
  const [altura, setAltura] = useState('auto')
  const [letra, setLetra] = useState(myFont.className)
  const [enMayusculas, setEnMayusculas] = useState(false)
  const [font, setFont] = useState('text-8xl')
  const [lineHeight, setLineHeight] = useState('0.9')

  const textAreaRef = useRef(null)

  const handleCambioTexto = (e) => {
    const nuevoContenido = e.target.value
    //const contenidoSinAcentos = quitarAcentos(nuevoContenido)
    setInputText(nuevoContenido)
    if (nuevoContenido.trim() === '') {
      setAltura('auto')
    } else {
      setAltura(`${e.target.scrollHeight}px`)
    }
  }
  // Función para borrar texto
  const handleBorrarTexto = () => {
    setAltura('auto')
    setInputText('')
    textAreaRef.current ? textAreaRef.current.focus() : null
  }
  // Función para quitar acentos
  const quitarAcentos = (texto) => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
  // Mayuscula
  const toggleMayusculas = () => {
    setEnMayusculas(!enMayusculas)
    if (enMayusculas) {
      setLetra(myFont.className)
      setFont('text-8xl')
      setLineHeight('0.9')
      setInputText(inputText.toLowerCase())
      textAreaRef.current ? textAreaRef.current.focus() : null
    } else {
      setInputText(inputText.toUpperCase())
      setLetra('')
      setFont('text-6xl')
      setLineHeight('1.6')
      textAreaRef.current ? textAreaRef.current.focus() : null
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <textarea
        ref={textAreaRef}
        style={{
          lineHeight: lineHeight,
          border: 'none',
          paddingTop: '10px',
          paddingLeft: '5px',
          height: altura,
        }}
        value={inputText}
        className={`w-full ${letra} font-sans block text-black ${font} border-none hover:border-none`}
        placeholder="Katherine"
        onChange={handleCambioTexto}
      />
      <div className="flex justify-center items-center ">
        <Speech
          text={`${inputText}`}
          rate={0.8}
          volume={1}
          onError={() => console.error('Browser not supported!')}
        >
          {({ speechStatus, start, pause }) => (
            <div>
              {speechStatus !== 'started' && (
                <button onClick={start}>
                  <Image
                    src="/audifono-start.png"
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                </button>
              )}
              {speechStatus === 'started' && (
                <button onClick={pause}>
                  <Image
                    src="/audifono-pausa.png"
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                </button>
              )}
            </div>
          )}
        </Speech>
        <button onClick={handleBorrarTexto}>
          <Image
            className="pl-4"
            src="/borrador.png"
            width={75}
            height={75}
            alt="Picture of the author"
          />
        </button>
        <button onClick={toggleMayusculas}>
          <Image
            className="pl-4"
            src="/mayuscula.png"
            width={75}
            height={75}
            alt="Picture of the author"
          />
        </button>
      </div>
      <Silabas title={inputText} />
    </div>
  )
}
