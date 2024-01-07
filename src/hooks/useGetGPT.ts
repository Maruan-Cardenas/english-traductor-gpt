import { useEffect, useState } from "preact/hooks"

export const useGetGPT = async (text: string) => {
    const [message, setMessage] = useState('')
    console.log(text)
    useEffect(()=>{
        (async()=>{
            if (text) {
                const response = await fetch('http:localhost:4321/gpt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(`Traduce al inglés: ${text}`)
                })
                const data = await response.json()
                setMessage(data)
            }
        })()
    },[text])
    
    return { message }
}