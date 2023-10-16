import { useState } from 'react'
import Speech from 'react-text-to-speech'
import localFont from 'next/font/local'
import Image from 'next/image'

const myFont = localFont({ src: './LearningCurve.ttf' })

export default function Voz() {
  const [inputText, setInputText] = useState('')
  const [altura, setAltura] = useState('auto')
  const [letra, setLetra] = useState(myFont.className)
  const [enMayusculas, setEnMayusculas] = useState(false)
  const [font, setFont] = useState('text-8xl')
  const [lineHeight, setLineHeight] = useState('1')

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
  }
  // Función para borrar texto
  const handleMayuscula = () => {
    setLetra('')
    setInputText(inputText.toUpperCase())
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
      setLineHeight('1')
      setInputText(inputText.toLowerCase())
    } else {
      setInputText(inputText.toUpperCase())
      setLetra('')
      setFont('text-6xl')
      setLineHeight('1.6')
    }
  }

  return (
    <>
      <div className="flex flex-col h-screen p-2">
        <textarea
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
            rate={1}
            volume={1}
            onError={() => console.error('Browser not supported!')}
          >
            {({ speechStatus, start, pause }) => (
              <div>
                {speechStatus !== 'started' && (
                  <button onClick={start}>
                    <Image
                      src="/audifono-start.png"
                      width={70}
                      height={70}
                      alt="Picture of the author"
                    />
                  </button>
                )}
                {speechStatus === 'started' && (
                  <button onClick={pause}>
                    <Image
                      src="/audifono-pausa.png"
                      width={70}
                      height={70}
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
              width={85}
              height={85}
              alt="Picture of the author"
            />
          </button>
          <button onClick={toggleMayusculas}>
            <Image
              className="pl-4"
              src="/mayuscula.png"
              width={85}
              height={85}
              alt="Picture of the author"
            />
          </button>
        </div>
      </div>
    </>
  )
}
