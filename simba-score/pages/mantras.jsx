import Layout from "../components/Layout"
import styles from "../styles/mantras.module.css"
import { useMantraContext } from "../context/mantrasContext"
import Link from "next/link"

export default function Mantras() {
    const {mantras} = useMantraContext()
    let rawMantraTags = []
    mantras.map(mantra => {
        mantra.tags.map(tag => {
            rawMantraTags.push(tag)
        })
    })
    let mantraTags = [... new Set(rawMantraTags)]

    const mantraButtons = mantraTags.map(tag => {
        return <button key={tag} className={styles.mantrabuttons}>{tag}</button>
    })

    return (
        <Layout>
            <div className={styles.page}>
                {mantraButtons}
                <Link href='/random'><button className={styles.mantrabuttons}>Random</button></Link>
            </div>
        </Layout>
    )
}