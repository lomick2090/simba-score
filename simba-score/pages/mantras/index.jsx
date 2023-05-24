import Layout from "../../components/Layout"
import styles from "../../styles/mantras.module.css"
import { useMantraContext } from "../../context/mantrasContext"
import Link from "next/link"
import { useState } from "react"
import Mantra from "../../components/Mantra"

export default function Mantras() {
    const [pickedCategory, setPickedCategory] = useState('')
    const {mantras} = useMantraContext()
    const shallowMantras = [...mantras]
    let rawMantraTags = []
    mantras.map(mantra => {
        mantra.tags.map(tag => {
            rawMantraTags.push(tag)
        })
    })
    let mantraTags = [... new Set(rawMantraTags)]

    function handleTagClick(tag) {
        if (pickedCategory) {
            setPickedCategory('')
        } else { 
            setPickedCategory(tag)
        }
    }

    const sortedMantras = shallowMantras.filter(mantra => {
        return (
            ( pickedCategory == mantra.tags[0] || pickedCategory == mantra.tags[1] )
        )
    })

    const mantraElements = sortedMantras.map(mantra => {
        const index = mantras.findIndex(ogMantra => {return ogMantra == mantra})
        return (
            <Mantra key={mantra.id} mantra={mantra} index={index}/>
        )
    })

    const mantraButtons = mantraTags.map(tag => {
        return (
            <div>
                {
                    (pickedCategory == '' || pickedCategory == tag)

                    &&

                    <button 
                        key={tag} 
                        className={styles.mantrabuttons}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </button>
                }
            </div>
        )
    })

    return (
        <Layout>
            <div>
                {
                    (pickedCategory == '') ?

                    <div className={styles.page}>
                        {mantraButtons}
                        <Link href='/random'><button className={styles.mantrabuttons}>Random</button></Link>
                    </div>
                    
                    :

                    <div className={styles.mantras}>
                        <div className={styles.buttons}>
                            {mantraButtons}
                        </div>
                        {mantraElements}
                        <button className={styles.mantrabuttons} onClick={() => handleTagClick('')}>Back</button>
                    </div>
                }
            </div>
        </Layout>
    )
}