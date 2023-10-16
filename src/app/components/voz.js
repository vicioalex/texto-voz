import { useState } from 'react'
import Speech from 'react-text-to-speech'
import localFont from 'next/font/local'

const myFont = localFont({ src: './LearningCurve.ttf' })

export default function Voz() {
  const [inputText, setInputText] = useState('')

  return (
    <>
      <div class="flex flex-col h-screen p-2">
        <div class="flex justify-center items-center ">
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
        <textarea rows="3"
          className={`w-full ${myFont.className} font-sans block text-black text-9xl border border-gray-300 p-1`}
          placeholder="Escribe aqui"
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
    </>
  )
}
