import { useEffect, useRef, useState } from "preact/hooks";

export const useRecordAudio = () => {
    const [audioChunks, setAudioChunks] = useState<Blob[]>([])
    const [recording, setRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState('')
    const [stream, setStream] = useState<MediaStream>()
    const recorder = useRef<MediaRecorder>()

    useEffect(() => {
        const initRecorder = async () => {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({ audio: true })
                setStream(streamData)
            } catch (error) {
                console.error('Error al acceder al micrófono:', error);
            }
        };

        initRecorder();
    }, [audioChunks]);

    const startRecording = () => {
        setAudioChunks([]);
        if (stream) {
            recorder.current = new MediaRecorder(stream)
            recorder.current.start();
            const audioChunk: Blob[] = []
            recorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunk.push(event.data)
                    console.log('ondataavailable')
                }
            };
            setAudioChunks(audioChunk)
            setRecording(true);
        }
    };

    const stopRecording = () => {
        if(recorder.current) {
            recorder.current.stop()
            recorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioChunks([]);
                setAudioUrl(audioUrl)
            }
        };
        setRecording(false);
    };

    return { recording, startRecording, stopRecording, audioUrl }
}