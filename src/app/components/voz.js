import { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'

export default function Voz() {
  const { speak } = useSpeechSynthesis()
  const [inputText, setInputText] = useState('')

  function handleSpeak() {
    speak({ text: inputText })
  }

  return (
    <div>
      <textarea
        className="text-black"
        rows="5"
        cols="50"
        placeholder="Escribe aqui"
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={() => handleSpeak()}>Speak</button>
    </div>
  )
}
