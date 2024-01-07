import { useRecordAudio } from "../hooks/useRecordAudio"

export const Audio = () => {
    const {stopRecording, startRecording, audioUrl, recording} = useRecordAudio()
    return (
        <div>
            <audio controls src={audioUrl} />
            {
                recording
                ? <button onClick={stopRecording}>Stop</button>
                : <button onClick={startRecording}>Start</button>
            }
            
            
        </div>    
    )
}