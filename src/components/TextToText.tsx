import { useStore } from "@nanostores/preact"
import { useState } from "preact/hooks"
import { gpt } from "../services/gpt"
import { languageStore } from "../store/screen"
import { Audio } from "./Audio"


export const TextToText = () => {
    const [text, setText] = useState('')
    const $language = useStore(languageStore)
    
    const traduction = (): void => {
        gpt(text, $language)
    }

    return (
        <section className="flex flex-col w-[50%]">
            <textarea type="text" onChange={(e: any) => setText(e.target.value)} class="resize-none h-[50vh]" />
            <div className="flex">
                <button onClick={traduction} className='w-full text-white bg-blue-500 text-wite'>Traducir</button>
                <Audio />
            </div>
        </section>    
    )
}