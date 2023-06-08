import { AudioRecorder } from 'react-audio-voice-recorder';
import Layout from '../../components/Layout';
import styles from '../../styles/mantras.module.css'
import { useMantraContext } from '../../context/mantrasContext';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../config/firebase'
import { useState } from 'react';
import { uuidv4 } from '@firebase/util';
import { doc, setDoc } from "firebase/firestore";

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

export default function Record() {
    const {mantras} = useMantraContext()
    const [input, setInput] = useState({
        category: '',
        file: ''
    })
    const [didSubmit, setDidSubmit] = useState(false)

    async function handleSubmit() {
        if ((input.category && input.category != "Choose Category") && input.file) {
            let id = uuidv4()
            let path
            let pictureURL
            try {
                path =`peptalks/${id}`
                const storageRef = ref(storage, path);
                await uploadBytes(storageRef, input.file)
                const imageRef = ref(storage, path)
                pictureURL = await getDownloadURL(imageRef)
                console.log(pictureURL)
                await setDoc(doc(db, "peptalks", id), {
                    url: pictureURL,
                    category: input.category,
                    votes: 0
                });
                setDidSubmit(true)
            } catch (err){
                console.log(err)
            }
        } else {
            alert('Please Fill Both Fields')
        }

    }

    function refresh() {
        setDidSubmit(false);
        setInput({
            category: '',
            file: ''
        })
    }

    function handleChange(e) {
        const {value, name, files} = e.target;
        if (files) {
            setInput(prevInput => {
                return {
                    ...prevInput,
                    [name]: files[0]
                }
            }) 
        } else {
            setInput(prevInput => {
                return {
                    ...prevInput,
                    [name]: value
                }
            })
        }
        console.log(input)
    }

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
            {
            didSubmit 
            
            ?

            <div className={styles.page}>
                <h1>Submitted!</h1>
                <br />
                <button className={styles.mantrabuttons} onClick={refresh}>Submit Another</button>
            </div>

            :

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
                    <input type="file" name="file" accept="audio/mp3" onChange={handleChange} />
                    <select name="category" id="category" value={input.category} onChange={handleChange}>
                        <option value={null} >Choose Category</option>
                        {mantraOptions}
                    </select>
                </div>
                <br />
                <button className={styles.mantrabuttons} onClick={handleSubmit}>Submit</button>

            </div>
            }
        </Layout>
    )
}