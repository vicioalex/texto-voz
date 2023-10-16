import { useState } from 'react'
import Speech from 'react-text-to-speech'
import localFont from 'next/font/local'

const myFont = localFont({ src: './LearningCurve.ttf' })

export default function Voz() {
  const [inputText, setInputText] = useState('')

  return (
    <>
      <div className="flex flex-col h-screen p-2">
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
                  <button onClick={start}>Play</button>
                )}
                {speechStatus === 'started' && (
                  <button onClick={pause}>Stop</button>
                )}
              </div>
            )}
          </Speech>
        </div>
        <textarea
          style={{ lineHeight: '0.7', border: 'none', paddingTop: '10px' }}
          rows="5"
          className={`w-full ${myFont.className} font-sans block text-black text-9xl border-none`}
          placeholder="Escribe aqui"
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
    </>
  )
}
