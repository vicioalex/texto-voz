import { useState } from 'react'
import Speech from 'react-text-to-speech'
import localFont from 'next/font/local'
import Image from 'next/image'

const myFont = localFont({ src: './LearningCurve.ttf' })

export default function Voz() {
  const [inputText, setInputText] = useState('')
  const [altura, setAltura] = useState('auto')

  const handleCambioTexto = (e) => {
    const nuevoContenido = e.target.value
    const contenidoSinAcentos = quitarAcentos(nuevoContenido)
    setInputText(contenidoSinAcentos)
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
  // Función para quitar acentos
  const quitarAcentos = (texto) => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  return (
    <>
      <div className="flex flex-col h-screen p-2">
        <textarea
          style={{
            lineHeight: '0.8',
            border: 'none',
            paddingTop: '10px',
            paddingLeft: '5px',
            height: altura,
          }}
          value={inputText}
          className={`w-full ${myFont.className} font-sans block text-black text-8xl border-none hover:border-none`}
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
        </div>
      </div>
    </>
  )
}
