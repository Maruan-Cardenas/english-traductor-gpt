import { useRecordAudio } from "../hooks/useRecordAudio"

export const Audio = () => {
    const {stopRecording, startRecording, audioUrl, recording, text} = useRecordAudio()
    return (
        <div>
            {text}
            <audio controls src={audioUrl} />
            {
                recording
                ? <button onClick={stopRecording}>Stop</button>
                : <button onClick={startRecording}>Start</button>
            }
            
            
        </div>    
    )
}