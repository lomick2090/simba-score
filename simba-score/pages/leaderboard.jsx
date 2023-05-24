import Mantra from "../components/Mantra"
import Layout from "../components/Layout"
import styles from '../styles/mantras.module.css'
import { useMantraContext } from "../context/mantrasContext"

export default function Leaderboard() {
    const {mantras} = useMantraContext()
    const sortedMantras = [...mantras].sort((a, b) => {return b.votes - a.votes } )

    const mantraElements = [];
    for (let i = 0; i < 10; i++) {
        mantraElements.push(
            <div className={styles.leaderboardcomp}>
                <h1># {i +1}</h1>
                    <Mantra key={i} mantra={sortedMantras[i]} index={i} />
                <hr />
            </div>
        )
    }
    return (
        <Layout>
            <div className={styles.page}>
                {mantraElements}
            </div>
        </Layout>
    )
}