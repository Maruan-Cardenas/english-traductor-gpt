import type { ChangeEvent } from "preact/compat"
import { useState } from "preact/hooks"
import { useGetGPT } from "../hooks/useGetGPT"

export const TextToText = () => {
    const [text, setText] = useState('')
    const { message } = useGetGPT(text)
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if(e.target) {
            console.log(e)
        }
    }

    return (
        <div>
            <input type="text" onChange={(e) => handleChange(e)} />
        </div>    
    )
}