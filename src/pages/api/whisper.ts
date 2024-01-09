import type { APIRoute } from "astro";
import axios from 'axios';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const audio = data.get('file')
    const model = 'whisper-1'
    const formData = new FormData();
        formData.append('model', model)
        formData.append('file', audio)
        axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`
            },
        }).then(res => {
            return new Response(JSON.stringify(res.data.text), { status: 200})
        })
    return new Response(JSON.stringify('hola'), { status: 200})
}