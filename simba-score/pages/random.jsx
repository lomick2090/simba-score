import Layout from "../components/Layout"
import Mantra from "../components/Mantra"
import { useMantraContext } from "../context/mantrasContext"

export default function Random() {
    const mantras = useMantraContext()
    const randoMantra = mantras[Math.floor(Math.random()*mantras.length)]

    return (
        <Layout>
            <Mantra mantra={randoMantra} />
        </Layout>
    )
}