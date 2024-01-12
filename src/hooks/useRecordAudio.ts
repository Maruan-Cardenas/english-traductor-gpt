import axios from 'axios';
import { useRef, useState } from "preact/hooks";
import { gpt } from '../services/gpt';
import { languageStore } from '../store/screen';
import { useStore } from '@nanostores/preact';

export const useRecordAudio = () => {
    const [audioChunks, setAudioChunks] = useState<Blob[]>([])
    const [recording, setRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState('')
    const recorder = useRef<MediaRecorder>()
    const $language = useStore(languageStore)

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            setAudioChunks([]);
            recorder.current = new MediaRecorder(stream)
            recorder.current.start();
            const audioChunk: Blob[] = []
            recorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunk.push(event.data)
                }
            };
            setAudioChunks(audioChunk)
            setRecording(true);

        } catch (error) {
            console.error('Error al acceder al micrófono:', error);
        }
    };

    const stopRecording = () => {
        if(recorder.current) {
            recorder.current.stop()
            recorder.current.onstop = async () => {
                const audioBlob = await new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioChunks([]);
                setAudioUrl(audioUrl)
                const model = 'whisper-1'
                const formData = new FormData();
                formData.append('model', model)
                formData.append('file', audioBlob)
                axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${import.meta.env.PUBLIC_OPENAI_API_KEY}`
                    },
                }).then(res => {
                    gpt(res.data.text, $language)
                })
                    }
                };
        setRecording(false);
    };

    return { recording, startRecording, stopRecording, audioUrl }
}