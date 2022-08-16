import {useState, useEffect} from "react"
import Time from "../assets/time.png"

function Card(props) {
    const [isFavorite, setIsFavorite] = useState(false)

    return(
        <li className='card' value={props.value}>
            <div className='card_information'>
                <div className='card_information-created'>
                <img className="time-icon" src={Time}/>
                <span>{props.created}</span>
                <span> by {props.author}</span>
                </div>
                <div>
                <span>{props.title}</span>
                </div>
            </div>
            <div className={isFavorite ? 'card_favorite' : 'card_non_favorite'} onClick={props.saveLocal}>
            </div>
        </li>
    )
}

export default Card