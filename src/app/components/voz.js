import { useState } from 'react'
import Speech from 'react-text-to-speech'
import localFont from 'next/font/local'
import Image from 'next/image'

const myFont = localFont({ src: './LearningCurve.ttf' })

export default function Voz() {
  const [inputText, setInputText] = useState('')

  return (
    <>
      <div className="flex flex-col h-screen p-2">
        <textarea
          style={{ lineHeight: '0.6', border: 'none', paddingTop: '10px' }}
          rows="4"
          className={`w-full ${myFont.className} font-sans block text-black text-9xl border-none`}
          placeholder="Escribe aqui"
          onChange={(e) => setInputText(e.target.value)}
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
                      width={50}
                      height={50}
                      alt="Picture of the author"
                    />
                  </button>
                )}
                {speechStatus === 'started' && (
                  <button onClick={pause}>
                    <Image
                      src="/audifono-pausa.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                    />
                  </button>
                )}
              </div>
            )}
          </Speech>
        </div>
      </div>
    </>
  )
}
