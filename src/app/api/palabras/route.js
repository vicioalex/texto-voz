import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

if (!configuration.apiKey)
  throw new Error('No OPENAI_API_KEY environment variable found')

const openai = new OpenAIApi(configuration)

export async function POST(request) {
  const body = await request.json()

  //   better error handling
  if (!body.prompt || body.prompt.length === 0) {
    return NextResponse.error(new Error('You must provide a prompt'), {
      status: 400,
    })
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      // prompt: `Separa en silabas  ${body.prompt}`,
      //prompt: `Tengo una frase, coloca en un arreglo cada palabra y que este separada en silabas por guiones: ${body.prompt}`,
      messages: [
        {
          role: 'system',
          content:
            'Eres una inteligencia artificial especializada en la real academia española (RAE)',
        },
        {
          role: 'user',
          content: `Separa la siguiente oracion en palabras: '${body.prompt}'. Responde solo las palabras`,
        },
      ],
      temperature: 1,
      max_tokens: 50,
      top_p: 1,
    })
    // console.log(response.data.choices[0].message.content)

    return NextResponse.json(response.data.choices[0].message.content)
  } catch (error) {
    return NextResponse.error(error, { status: 500 })
  }
}
