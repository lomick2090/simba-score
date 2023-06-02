import { AudioRecorder } from 'react-audio-voice-recorder';
import Layout from '../../components/Layout';
import styles from '../../styles/mantras.module.css'
import { useMantraContext } from '../../context/mantrasContext';

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

export default function Record() {
    const {mantras} = useMantraContext()

    let rawMantraTags = []
    let i = 0
    mantras.map(mantra => {
        i++
        mantra.tags.map(tag => {
            rawMantraTags.push(tag)
        })
    })
    let mantraTags = [... new Set(rawMantraTags)]

    const mantraOptions = mantraTags.map(tag => {
        return (
                    <option
                        value={tag}
                        key={tag}
                    >
                        {tag}
                    </option>

        )
    })

    return (
        <Layout>
            <div className={styles.page}>
                <h1>Record your own peptalk here:</h1>
                <br />
                <AudioRecorder 
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }} 
                    downloadOnSavePress={true}
                    downloadFileExtension="mp3"
                />
                <br />
                <p>Hit the record button, then when you are done, hit the save icon on the left, then upload the file here:</p>
                <br />
                <div>
                    <input type="file" accept="audio/mp3"/>
                    <select name="category" id="category">
                        <option value={null} selected >Choose Category</option>
                        {mantraOptions}
                    </select>
                </div>
                <button>Submit</button>

            </div>
        </Layout>
    )
}