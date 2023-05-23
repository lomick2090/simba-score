import { useState, useEffect} from "react"
import Layout from "../components/Layout"
import Mantra from "../components/Mantra"
import { useMantraContext } from "../context/mantrasContext"
import styles from '../styles/mantras.module.css'

export default function Random() {
    const [rando, setRando] = useState()
    const {mantras, localVotes} = useMantraContext()

    useEffect(() => {
        setRando(Math.floor(Math.random()*mantras.length))
    }, [])

    function getRandom() {
        setRando(Math.floor(Math.random()*mantras.length))
    }

    const randoMantra = mantras[rando]

    return (
        <Layout>
            <div className={styles.page}>

                <Mantra mantra={randoMantra} index={rando} />

                <button onClick={getRandom}>Get Random</button>
            </div>
        </Layout>
    )
}