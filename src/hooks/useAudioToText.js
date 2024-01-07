import { useEffect, useRef, useState } from "preact/hooks"

export const useAudioToText = () => {
    const recognition = useRef()
    const [text, setText] = useState('')

    useEffect(()=>{
        let SpeechRecognition = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
        recognition.current = new SpeechRecognition();
    }, [])

    const audioToTextStart = () => {
        let noteContent = ''
        if (recognition.current) {
            recognition.current.start()
            recognition.current.onresult = function(event) {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                noteContent += transcript
                setText(noteContent)
            }
        }
    }

    const audioToTextEnd = () => {
        recognition.current.stop()
    }

    return { audioToTextStart, audioToTextEnd, text}
}