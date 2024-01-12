import { screenStore } from "../store/screen";


export const gpt = async (text: string, language: string) => {
    if (text) {
        const response = await fetch('/api/gpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(`Translate: ${text} into ${language}`)
        })
        const data = await response.json()
        screenStore.set(data)
    }
}