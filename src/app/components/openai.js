import { useEffect } from 'react'
import OpenAI from 'openai'

export default function Open() {
  useEffect(() => {
    const openai = new OpenAI({
      apiKey: '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',
    })

    async function fetchData() {
      try {
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: 'Say this is a test' }],
          model: 'text-davinci-003',
        })

        console.log(chatCompletion.choices)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>OpenAI Chat Completions</h1>
    </div>
  )
}
