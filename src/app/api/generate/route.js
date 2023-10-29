import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

if (!configuration.apiKey)
  throw new Error('No OPENAI_API_KEY environment variable found')

const openai = new OpenAIApi(configuration)

export async function POST(request) {
  const { req, res } = request

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.status(200).end()
    return
  }

  const body = await request.json()

  // better error handling
  if (!body.prompt || body.prompt.length === 0) {
    return NextResponse.error(new Error('You must provide a prompt'), {
      status: 400,
    })
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Actua como un especialista de la real academia española (RAE)',
        },
        {
          role: 'user',
          content: `Separa con el signo | las palabras y con guiones las sílabas, la palabra el va junto: '${body.prompt}'. Responde solo las palabras y sílabas`,
        },
      ],
      temperature: 1,
      max_tokens: 50,
      top_p: 1,
    })

    return NextResponse.json(response.data.choices[0].message.content)
  } catch (error) {
    return NextResponse.error(error, { status: 500 })
  }
}
