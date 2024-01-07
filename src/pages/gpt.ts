import type { APIRoute } from "astro";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
}) 

export const POST: APIRoute = async ({ request }) => {
  const userMessage = await request.json()

  const chat = await openai.chat.completions.create({
     messages: [
       { role: "system", content: "Eres un traductor de inglés" },
       { role: 'user', content: userMessage }
     ],
     model: "gpt-3.5-turbo",
  })

  const message = chat.choices[0].message.content

    return new Response(JSON.stringify({
    message
    }), {
    status: 200
    })
  }