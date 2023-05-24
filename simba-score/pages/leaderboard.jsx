import Mantra from "../components/Mantra"
import Layout from "../components/Layout"
import styles from '../styles/mantras.module.css'
import { useMantraContext } from "../context/mantrasContext"

export default function Leaderboard() {
    const {mantras} = useMantraContext()
    const sortedMantras = [...mantras].sort((a, b) => {return b.votes - a.votes } )

    const mantraElements = sortedMantras.map((mantra, index) => {
        return (
            <div>
                <h1># {index +1}</h1>
                <Mantra key={index} mantra={mantra} index={index} />
                <hr />
            </div>
        )
    })
    return (
        <Layout>
            <div className={styles.page}>
                {mantraElements}
            </div>
        </Layout>
    )
}