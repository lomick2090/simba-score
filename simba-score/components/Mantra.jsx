import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/mantraComponent.module.css'
import { useEffect, useState } from 'react'
import { useMantraContext } from '../context/mantrasContext'
import { db } from '../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export default function Mantra({mantra, index}) {
    const [userVote, setUserVote] = useState(0)
    const {localVotes, setLocalVotes, mantras} = useMantraContext()
    
    useEffect(() => {
        setUserVote(localVotes[index])
    }, [])

    async function pushVote(vote) {
        const mantraRef = doc(db, 'mantraTEST', mantras[index].id)
        const prevVotes = mantras[index]?.votes
        if (userVote == 0) {
            await updateDoc(mantraRef, {
                votes: (prevVotes + vote)

            })
        } else {
            await updateDoc(mantraRef, {
                votes: (prevVotes + (vote*2))
            })
        }
    }
    function handleVote(vote) {
        if (vote != userVote) {
            pushVote(vote)
            setLocalVotes(prevVotes => {
                const tempVotes =  [...prevVotes]
                tempVotes[index] = vote
                return tempVotes
            })
            localStorage.setItem('votes', JSON.stringify(localVotes))
            setUserVote(vote)

        } 
    }


    return (
        <div className={styles.mantra}>
            <h3>{mantra?.mantra}</h3>
            <div style={{display:'flex', justifyContent:'space-around'}}>
                <FontAwesomeIcon 
                    icon={faThumbsUp} 
                    onClick={() => handleVote(1)}
                    className={(userVote > 0) ? styles.selected : ''}
                />
                <FontAwesomeIcon 
                    icon={faThumbsDown} 
                    onClick={() => handleVote(-1)}
                    className={(userVote < 0) ? styles.selected : ''}
                />
            </div>
        </div>
    )
}