import { useRecordAudio } from "../hooks/useRecordAudio"
import { Mic } from "../svg/mic.tsx"

export const Audio = () => {
    const { stopRecording, startRecording, recording } = useRecordAudio()
    return (
        <section>
            {
                recording
                ? <button onMouseUp={stopRecording} className="h-full bg-red-500">
                    <Mic class="p-2" />
                </button>
                : <button onMouseDown={startRecording} className="h-full bg-blue-500">
                    <Mic class="p-2" />
                </button>
            }
        </section>    
    )
}