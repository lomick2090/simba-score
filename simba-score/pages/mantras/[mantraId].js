import Layout from "../../components/Layout"
import Mantra from "../../components/Mantra"
import styles from "../../styles/mantras.module.css"
import { useRouter } from "next/router"
import { useMantraContext } from "../../context/mantrasContext"

export default function Page() {
    const {mantras} = useMantraContext()
    const router = useRouter()

    const mantraIndex = mantras.findIndex(mantra => {
        return (
            mantra.id == router.query.mantraId
        )
    })

    return (
        <Layout>
            <div className={styles.page}>
                <Mantra mantra={mantras[mantraIndex]} index={mantraIndex} />
            </div>
        </Layout>
    )
}