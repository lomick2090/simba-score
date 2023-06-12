import Layout from "../../components/Layout"
import styles from "../../styles/mantras.module.css"
import { useMantraContext } from "../../context/mantrasContext"
import Link from "next/link"
import { useState } from "react"
import PepTalk from "../../components/PepTalk"

export default function Mantras() {
    const [pickedCategory, setPickedCategory] = useState('')
    const {pepTalks} = useMantraContext()
    const shallowPepTalks = [...pepTalks]
    let rawPepTags = []
    pepTalks.map(pepTalk => {
        rawPepTags.push(pepTalk.category)
    })
    let pepTags = [... new Set(rawPepTags)]

    function handleTagClick(category) {
        if (pickedCategory) {
            setPickedCategory('')
        } else { 
            setPickedCategory(category)
        }
    }

    const sortedPepTalks = shallowPepTalks.filter(pepTalk => {
        return (
            (pickedCategory == pepTalk.category)
        )
    })

    const pepElements = sortedPepTalks.map(pepTalk => {
        const index = pepTalks.findIndex(ogPepTalk => {return ogPepTalk == pepTalk})
        return (
            <PepTalk key={pepTalk.id} pepTalk={pepTalk} index={index}/>
        )
    })

    const pepButtons = pepTags.map(category => {
        return (
            <div key={category} >
                {
                    (pickedCategory == '' || pickedCategory == category)

                    &&

                    <button 
                        
                        className={styles.mantrabuttons}
                        onClick={() => handleTagClick(category)}
                    >
                        {category}
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
                        {pepButtons}
                        <Link href='/random'><button className={styles.mantrabuttons}>Random</button></Link>
                    </div>
                    
                    :

                    <div>
                        <div className={styles.buttons}>
                            {pepButtons}
                        </div>
                        <div
                            className={styles.mantras}
                        >

                            {pepElements}
                            <button className={styles.mantrabuttons} onClick={() => handleTagClick('')}>Back</button>
                        </div>
                    </div>
                }
            </div>
        </Layout>
    )
}