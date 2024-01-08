import { useEffect, useState } from "preact/hooks"

export const useGetGPT = (text: string) => {
    const [message, setMessage] = useState('')
    console.log(text)
    useEffect(()=>{
        (async()=>{
            if (text) {
                const response = await fetch('/api/gpt', {
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
    console.log(message)
    return { message }
}