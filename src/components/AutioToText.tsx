import { useAudioToText } from "../hooks/useAudioToText"
import { useGetGPT } from "../hooks/useGetGPT"

export const AudioToText = () => {
    const { audioToTextEnd, audioToTextStart, text } = useAudioToText()
    const { message } = useGetGPT(text)
    return (
        <div>
            <p>{message}</p>
            <button onClick={audioToTextStart}>Start</button>
            <button onClick={audioToTextEnd}>End</button>
        </div>    
    )
}