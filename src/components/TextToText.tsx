import type { ChangeEvent } from "preact/compat"
import { useState } from "preact/hooks"

export const TextToText = () => {
    const [text, setText] = useState('')
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if(e.target) {
            setText(e.target.value)
        }
    }

    return (
        <div>
            <input type="text" onChange={(e) => handleChange(e)} />
        </div>    
    )
}