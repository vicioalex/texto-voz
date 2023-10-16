import { useState } from 'react'
import Speech from 'react-text-to-speech'

export default function Voz() {
  const [inputText, setInputText] = useState('')

  return (
    <>
      <textarea
        className="text-black"
        rows="5"
        cols="50"
        placeholder="Escribe aqui"
        onChange={(e) => setInputText(e.target.value)}
      />
      <Speech
        text={`${inputText}`}
        pitch={1.5}
        rate={1}
        volume={1}
        onError={() => console.error('Browser not supported!')}
      >
        {({ speechStatus, start, pause }) => (
          <div>
            {speechStatus !== 'started' && (
              <button className="my-start-btn" onClick={start}>
                Start
              </button>
            )}
            {speechStatus === 'started' && (
              <button className="my-pause-btn" onClick={pause}>
                Pause
              </button>
            )}
          </div>
        )}
      </Speech>
    </>
  )
}
