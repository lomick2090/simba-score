import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function Mantra({mantra}) {
    
    return (
        <div>
            <h3>{mantra?.mantra}</h3>
            <FontAwesomeIcon icon={faThumbsUp} />
        </div>
    )
}